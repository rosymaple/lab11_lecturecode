import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// define variable and use defineStore function to create student store
// 'use' before the store name is Pinia syntax
export const useStudentStore = defineStore('students', () => {

    const studentList = ref([
        { name: 'A. Student', starID: '34342', present: false},
        { name: 'B. Student', starID: '34333', present: false},
    ])

    // create empty mostRecentStudent variable
    const mostRecentStudent = ref ( {} )

    // function created to addNewStudent to end of studentList array
    function addNewStudent(student) {
        // push student to studentList array
        studentList.value.push(student)
    }

    // need to create a new function for deleting students from studentList array
    function deleteStudent(studentToDelete) {
        // filtering out anyone who isn't student we need to delete
        studentList.value = studentList.value.filter( (student) => {
            return studentToDelete != student
        })
        mostRecentStudent.value = { } // reset most recent message with an empty object
    }

    function arrivedOrLeft(student) {
        mostRecentStudent.value = student.present;
        console.log(mostRecentStudent.value)
        // arrivedOrLeft function just needs the value of our mostRecentStudent variable
        // and it will return one student's name when arrivedOrLeft function is called
    }

    // studentCount is a computed const value
    // studentCount is a general studentList computation that could be used with multiple components
    // so we can store it in our pinia store...instead of studentTable
    const studentCount = computed( () => {
        return studentList.value.length
    })

    const sortedStudents = computed(() => {
        return studentList.value.toSorted ( (s1, s2) => {
            return s1.name.localeCompare(s2.name)
        })
    })

    return {
        // reactive data
        studentList,
        mostRecentStudent,
        // functions
        addNewStudent,
        deleteStudent,
        arrivedOrLeft,

        // computed properties
        studentCount,
        sortedStudents

    }

})