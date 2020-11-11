<template>
  <q-page padding>
    <q-toolbar class="row">
      <q-toolbar-title class="col-auto">
        <q-icon name="mdi-format-list-checks" />
        {{ $t("words.todo_list") }}
      </q-toolbar-title>
      <q-tabs v-model="tab" class="text-teal col flex flex-center">
        <q-tab name="all" :label="$t('words.all')" />
        <q-tab name="today" :label="$t('words.today')" />
        <q-tab name="week" :label="$t('words.week')" />
        <q-tab name="month" :label="$t('words.month')" />
      </q-tabs>
      <q-btn
        v-if="todos && todos.length > 0"
        class="col-auto"
        icon="mdi-plus"
        :label="$t('words.add_todo')"
        color="lc-green"
        @click="openTodoDialog"
      />
      <span v-else class="col-1" />
    </q-toolbar>
    <div v-if="todos && todos.length > 0 && !loading" class="q-pa-md">
      <div class="q-mt-md">
        <todo-list-card
          v-for="todo in filteredTodos"
          :key="todo.id"
          class="q-mb-md"
          :todo="todo"
        />
      </div>
    </div>
    <div v-else-if="loading" class="text-h6 text-weight-regular">
      <q-icon name="mdi-loading mdi-spin" class="q-mr-sm" />
      {{ $t("words.loading") }}...
    </div>
    <div v-else>
      <div class="row justify-center">
        <div class="q-my-xl q-py-xl col-3">
          <q-avatar
            text-color="grey-5"
            icon="mdi-format-list-checks"
            size="170px"
            class="flex q-mx-auto lc-bg-grey-4 lc-circle-shadow-top"
          />

          <p class="text-h6 text-center q-mt-md">
            {{ $t("warnings.no_todo_found_head") }}
          </p>
          <p class="text-center q-my-lg q-mx-md">
            {{ $t("warnings.no_todos_found_desc") }}
          </p>
          <q-btn
            icon="mdi-plus"
            color="lc-green"
            :label="$t('words.add_todo')"
            class="flex q-mx-auto"
            style="max-width: 50%;"
            @click="openTodoDialog"
          />
        </div>
      </div>
    </div>
    <todo-dialog ref="TodoDialog" />
  </q-page>
</template>

<script>
import TodoListCard from "../components/cards/TodoListCard";
import TodoDialog from "../components/dialogs/TodoDialog";
import { mapGetters } from "vuex";
import moment from "moment";

export default {
  name: "Todo",
  components: {
    TodoListCard,
    TodoDialog
  },
  data() {
    return {
      search: "",
      tab: "all"
    };
  },
  computed: {
    ...mapGetters({
      todos: "todo/getData",
      loading: "loading/getLoading"
    }),
    filteredTodos() {
      const filteredDates = [];

      if (this.tab === "today") {
        this.todos.forEach(todo => {
          if (
            moment(todo.date).format("YYYY-MM-D") ===
            moment().format("YYYY-MM-D")
          ) {
            filteredDates.push(todo);
          }
        });
        return filteredDates;
      } else if (this.tab === "week") {
        this.todos.forEach(todo => {
          const todoWeek =
            moment(todo.date).week() -
            moment(todo.date)
              .startOf("month")
              .week() +
            1;

          const currentWeek =
            moment().week() -
            moment()
              .startOf("month")
              .week() +
            1;

          if (
            moment(todo.date).format("YYYY-MM") ===
              moment().format("YYYY-MM") &&
            todoWeek === currentWeek
          ) {
            filteredDates.push(todo);
          }
        });
        return filteredDates;
      } else if (this.tab === "month") {
        this.todos.forEach(todo => {
          if (
            moment(todo.date).format("YYYY-MM") === moment().format("YYYY-MM")
          ) {
            filteredDates.push(todo);
          }
        });
        return filteredDates;
      }
      return this.todos;
    }
  },
  mounted() {
    this.$store.dispatch("todo/getTodos");
  },
  methods: {
    openTodoDialog() {
      this.$refs.TodoDialog.show(null);
    }
  }
};
</script>
