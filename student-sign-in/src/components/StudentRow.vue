<script setup>

import { ref } from 'vue'

const props = defineProps( {
  student: Object
})

const emit = defineEmits ( [ ' arrived-or left', 'delete-student'])

// new ref making a copy of whether or not student is present
const isStudentPresent = ref(props.student.present)

// never change data in a prop in vue
// the data in a prop belongs to the parent component

// need to create a const function
// this function is emitting a message to this components parents which is studentTable.vue
const notifyArrivedOrLeft = () => {
  // tell parent that student arrived or left - emit event
  emit (' arrived-or left', props.student, isStudentPresent.value)
  // send who arrived or left, and the value associated with isStudentPresent ...
  // when notifyArrivedOrLeft function is called.
}

// need to create deleteStudent function
const confirmThenDeleteStudent = () => {
  emit('delete-student', props.student)
  // sending prop back to studentTable
}

</script>

<template>

  <tr class="align-middle" v-bind:class="{ present: student.present, absent: !student.present }">
    <td>{{ student.name }}</td>
    <td>{{ student.starID }}</td>
    <td>
      <!-- todo v-model checkbox -->
      <!-- simplify the line below, we dont need to type the (student) argument -->
      <input type="checkbox" v-model="isStudentPresent" v-on:change="notifyArrivedOrLeft">
      <span class="mx-3" v-if="student.present">Here!</span>
      <span class="mx-3" v-else>Not present</span>
    </td>
    <td>
      <button class="btn btn-danger" v-on:click="confirmThenDeleteStudent">
        <i class="bi bi-trash-fill"></i> Delete
      </button>
    </td>
  </tr>


</template>

<style scoped>

/* styles are specific to student rows */
/* studentRow controls how we show students displayed in student list */

.present {
  color: gray;
  font-style: italic;
}

.absent {
  color: black;
  font-weight: bold;
}

</style>