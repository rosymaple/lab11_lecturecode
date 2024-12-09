<script setup>

import { useStudentStore } from "../stores/StudentStore.js";

// import storeToRefs function
import { storeToRefs } from "pinia";

import { computed } from 'vue'

import StudentRow from './StudentRow.vue'

import StudentMessage from "./StudentMessage.vue";

// importing userStudentStore() function
// get a reference to student store
const studentStore = useStudentStore()

// convert things in our store to ref's in our script
// sortedStudents will hold our data that we will use in the template below
const { sortedStudents, studentCount } = storeToRefs(studentStore)

// need to create function to delete students from studentList
const deleteStudent = (student) => {
  studentStore.deleteStudent(student)
}

// need to create function to store arrivedOrLeft value
// need to add isStudentPresent argument
const arrivedOrLeft = (student, isStudentPresent) => {
  // need to store arrivedOrLeft in studentStore
  // using pinia store's makes it easier to share data among many components
  student.present = isStudentPresent
  studentStore.arrivedOrLeft(student)
}

// create computed const value to fix grammar
// pluralStudentMessage is only really relevant to this component, so we store it here
const pluralStudentMessage = computed ( () => {
  if (studentCount.value === 1) {
    return 'There is 1 student in class'
  } else {
    return `There are ${studentCount.value} students in class`
  }
})


</script>

<template>

  <!-- need to import HTML from weeks prior -->

  <div id="student-list-table" class="card m-2 p-2">
    <h4 class="card-title">Student List</h4>
    <h5 class="card-subtitle text-muted">{{ pluralStudentMessage }}</h5>

    <!-- i want to fix the grammar above so it's correct, where should i fix it?
    i will fix it in studentTable instead of fixing it in the store to keep the store simple
    if components can perform a task by themselves, fix it within the component not the pinia store -->

    <div id="student-table">
      <table class="table">
        <thead>
        <tr class="align-middle">
          <th>Name</th>
          <th>StarID</th>
          <th>Present?</th>
          <th>Delete</th>
        </tr>
        </thead>

        <tbody>

        <!-- dont change data in a prop directly using vue -->
        <!-- because data in prop values belongs to parent component -->
        <!-- studentRow will make multiple rows of student row component -->
        <!-- arrived-or-left called arrivedOrLeft function and we modify arrivedOrLeft to include two arguments -->
        <StudentRow
            v-for="student in sortedStudents"
            v-bind:student="student"
            v-on:arrived-or-left="arrivedOrLeft"
            v-on:delete-student="deleteStudent"
        ></StudentRow>

        </tbody>
      </table>
    </div>
  </div>

</template>

<style scoped>

/* need CSS from stylesheet from project weeks prior */
/* all of our CSS stored here - lets move some of this data into studentRow to separate component data */

#student-table {
  max-height: 500px;
  overflow: scroll;
}

th, td {
  width: 25%;
  text-align: center;
}

</style>