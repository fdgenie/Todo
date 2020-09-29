<template>
  <q-item v-if="to !== ''" clickable v-close-popup :to="to" :disable="disable">
    <q-item-section avatar>
      <q-icon :name="icon">
        <q-badge
          v-if="badge"
          color="red"
          class="q-pa-none"
          floating
          style="width: 6px; height: 6px; border-radius: 50%;"
        ></q-badge>
      </q-icon>
    </q-item-section>
    <q-item-section no-wrap>
      <q-item-label>{{ $t(label) }}</q-item-label>
    </q-item-section>
  </q-item>
  <q-item
    v-else
    :clickable="clickable"
    v-close-popup
    @click="$event => $emit('click', $event)"
    :disable="disable"
  >
    <q-item-section avatar>
      <q-icon :name="icon">
        <q-badge
          v-if="badge"
          color="red"
          class="q-pa-none"
          floating
          style="width: 6px; height: 6px; border-radius: 50%;"
        ></q-badge>
      </q-icon>
    </q-item-section>
    <q-item-section no-wrap>
      <q-item-label>{{
        labelText !== "" ? labelText : $t(label)
      }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: "ListItem",
  props: {
    to: {
      type: String,
      required: false,
      default: ""
    },
    icon: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: false,
      default: ""
    },
    disable: {
      type: Boolean,
      required: false,
      default: false
    },
    labelText: {
      type: String,
      required: false,
      default: ""
    },
    clickable: {
      type: Boolean,
      required: false,
      default: true
    },
    badge: {
      type: Boolean,
      required: false,
      default: false
    }
  }
};
</script>
