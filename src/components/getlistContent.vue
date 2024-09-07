<template>
    <button @click="getlist" id="listB">Press to Sign</button>
    <div>
      <div v-for="(user,index) in listResult" >
        <p class="liste">{{ user.id }} | {{ user.email }} | {{ user.firstname }} | {{ user.lastname }}</p>
        <br>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const listResult = ref('');
  const getlist = async () => {
    const tokenJson = localStorage.getItem('token');
  
    if (tokenJson) {
      const tokenObj = JSON.parse(tokenJson);
      const token = tokenObj.token;
  
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
  
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };
  
      try {
        const response = await fetch("http://localhost:8080/api/v1/info/everyuser", requestOptions);
        if (response.ok) {
          const result = await response.json();
          console.log(result);
          listResult.value = result; // Save the result in the reactive variable
        } else {
          listResult.value = `Error: ${response.status} ${response.statusText}`;
        }
      } catch (error) {
        console.error(error);
        listResult.value = `Error: ${error.message}`;
      }
    } else {
      listResult.value = 'No token found in localStorage.';
    }
  };
  </script>
  