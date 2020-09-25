import { axiosInstance } from "../../boot/axios";

export function getTodos({ commit }) {
  commit("loading/setLoading", null, { root: true });

  axiosInstance({
    url: "/",
    method: "post",
    data: {
      query: `
        query {
          getTodos {
            id
            title
            description
            done
            date
            }
          }
        `
    }
  })
    .then(result => {
      commit("setTodos", result.data.data);
    })
    .finally(() => {
      commit("loading/stopLoading", null, { root: true });
    });
}

export function deleteTodo({ commit }, id) {
  commit("loading/setLoading", null, { root: true });

  axiosInstance({
    url: "/",
    method: "post",
    data: {
      query: `
      mutation {
        deleteTodo(id: ${id}) {
            title
            description
            done
            date
            }
          }
        `
    }
  })
    .then(result => {
      commit("removeTodo", id);
    })
    .finally(() => {
      commit("loading/stopLoading", null, { root: true });
    });
}

export function createTodo({ commit }, data) {
  commit("loading/setLoading", null, { root: true });

  axiosInstance({
    url: "/",
    method: "post",
    data: {
      query: `
      mutation {
        createTodo(todo: {title:"${data.title}", description:"${data.description}", date:"${data.date}"}) {
          id
          title
          description
          date
          done
            }
          }
        `
    }
  })
    .then(result => {
      commit("addTodo", result.data.data);
    })
    .finally(() => {
      commit("loading/stopLoading", null, { root: true });
    });
}

export function updateTodo({ commit }, data) {
  commit("loading/setLoading", null, { root: true });

  axiosInstance({
    url: "/",
    method: "post",
    data: {
      query: `
      mutation {
        updateTodo(id:${data.id}, todo: {description:"${data.description}", done:${data.done} date:"${data.date}"}) {
          description
          done
          date
          id
          title
            }
          }
        `
    }
  })
    .then(result => {
      commit("editTodo", result.data.data.updateTodo);
    })
    .finally(() => {
      commit("loading/stopLoading", null, { root: true });
    });
}

export function changeTodoStatus({ commit }, data) {
  commit("loading/setLoading", null, { root: true });

  axiosInstance({
    url: "/",
    method: "post",
    data: {
      query: `
      mutation {
        changeTodoStatus(id:${data.id}) {
          id
          title
          description
          done
            }
          }
        `
    }
  })
    .then(result => {
      commit("editTodo", result.data.data.changeTodoStatus);
    })
    .finally(() => {
      commit("loading/stopLoading", null, { root: true });
    });
}