<template>
  <q-dialog persistent v-model="open">
    <q-card style="width: 100vw;">
      <q-card-section>
        <div class="text-h6">
          {{ label }} {{ $t("words.todo") }}
          <span v-if="isUpdate">({{ title }})</span>
        </div>
      </q-card-section>

      <q-card-section class="row q-gutter-md">
        <q-input
          class="col"
          ref="title"
          outlined
          :label="$t('words.title') + '*'"
          v-model="title"
          :disable="isUpdate"
          :rules="[val => !!val || $t('rules.field_is_required')]"
        />
        <div class="col-auto">
          <q-input
            ref="date"
            filled
            v-model="date"
            :rules="[
              val => !!val || $t('rules.field_is_required'),
              val => validateDate(val) || $t('rules.not_right_format')
            ]"
          >
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-date v-model="date" mask="YYYY-MM-DD HH:mm">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>

            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-time v-model="date" mask="YYYY-MM-DD HH:mm" format24h>
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <q-input
          class="col-12 q-pr-md"
          ref="description"
          outlined
          :label="$t('words.description')"
          v-model="description"
          type="textarea"
        />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat :label="$t('words.cancel')" @click="hide" />
        <q-btn flat :label="label" color="primary" @click="performAction" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import moment from "moment";

export default {
  name: "TodoDialog",
  data() {
    return {
      open: false,
      title: "",
      description: "",
      id: false,
      date: moment(Date()).format("YYYY-MM-D HH:mm"),
      todo: {}
    };
  },
  computed: {
    label() {
      if (this.isUpdate) {
        return this.$t("words.update");
      }
      return this.$t("words.create");
    },
    isUpdate() {
      return this.id !== false;
    }
  },
  watch: {
    open(open) {
      if (!open) {
        // cleanup
        this.id = false;
        this.title = "";
        this.description = "";
        this.date = moment(Date()).format("YYYY-MM-D HH:mm");
      }
    }
  },
  methods: {
    show(todo) {
      this.open = true;
      if (todo) {
        this.id = todo.id;
        this.title = todo.title;
        this.description = todo.description;
        this.date = this.formatDate(todo.date);
        this.todo = todo;
      }
    },
    hide() {
      this.open = false;
    },
    performAction() {
      if (this.isUpdate) {
        this.performUpdate();
      } else {
        this.performCreate();
      }
    },
    performUpdate() {
      if (!this.$refs.date.validate()) {
        return;
      }

      let data = {
        ...this.todo,
        description: this.description,
        date: moment(this.date).format()
      };

      this.$store.dispatch("todo/updateTodo", data).then(() => {
        this.open = false;
      });
    },
    performCreate() {
      if (!this.$refs.title.validate() || !this.$refs.date.validate()) {
        return;
      }

      let data = {
        title: this.title,
        description: this.description,
        date: this.date !== "" ? moment(this.date).format() : null
      };

      this.$store.dispatch("todo/createTodo", data).then(() => {
        this.open = false;
      });
    },
    formatDate(date) {
      return moment(date).format("YYYY-MM-D HH:mm");
    },
    validateDate(val) {
      return moment(val).isValid();
    }
  }
};
</script>
