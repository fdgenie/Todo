<template>
  <q-card>
    <q-card-section class="row">
      <span class="col row text-h6">
        <q-btn
          :color="todo.done ? 'lc-green' : 'negative'"
          @click="changeStatus"
        >
          <q-icon :name="todo.done ? 'mdi-check' : 'close'" />
        </q-btn>
        <span
          class="col flex flex-center"
          :class="todo.done ? 'text-strike' : false"
        >
          {{ todo.title }}
        </span>
      </span>
      <q-btn flat round icon="mdi-dots-vertical" dense>
        <list-menu>
          <list-item
            icon="mdi-pencil"
            label="words.edit_todo"
            @click="openUpdateDialog(todo)"
          />
          <list-item
            icon="mdi-delete"
            label="words.delete_todo"
            @click="deleteTodo(todo)"
          />
        </list-menu>
      </q-btn>
    </q-card-section>
    <q-separator />
    <q-card-section class="row text-bold" style="font-size: 16px;">
      <div v-if="todo.description" class="col flex flex-center">
        <q-icon
          class="q-pr-sm"
          name="mdi-clipboard-check-multiple-outline"
          size="24px"
        />
        {{ todo.description }}
      </div>
      <div class="col flex flex-center">
        <q-icon class="q-pr-sm" name="mdi-calendar-clock" size="24px" />
        {{ date }}
      </div>
    </q-card-section>
    <todo-dialog ref="TodoDialog" />
  </q-card>
</template>

<script>
import ListMenu from "../misc/ListMenu";
import ListItem from "../misc/ListItem";
import TodoDialog from "../dialogs/TodoDialog";
import moment from "moment";

export default {
  name: "TodoListCard",
  components: {
    ListMenu,
    ListItem,
    TodoDialog
  },
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  computed: {
    date() {
      return moment(this.todo.date).format("YYYY-MM-D HH:mm");
    }
  },
  methods: {
    changeStatus() {
      let data = {
        id: this.todo.id,
        description: this.todo.description,
        done: this.todo.done,
        date: this.todo.date
      };

      this.$store.dispatch("todo/changeTodoStatus", data).then(() => {
        this.open = false;
      });
    },
    openUpdateDialog(todo) {
      this.$refs.TodoDialog.show(todo);
    },
    deleteTodo(todo) {
      this.$q
        .dialog({
          title: this.$t("words.delete_todo"),
          message:
            this.$t("words.delete_todo_confirm") + ` <b>${todo.title}</b>`,
          cancel: true,
          color: "negative",
          html: true,
          persistent: true
        })
        .onOk(() => {
          this.$store.dispatch("todo/deleteTodo", todo.id);
        });
    }
  }
};
</script>
