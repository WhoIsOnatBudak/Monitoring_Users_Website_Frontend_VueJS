<template>
  <div class="container">
    <!-- Display user info -->
    <span class="userInfoBox">
      <div v-for="(user, index) in listResult" :key="index">
        <h1>Your Info</h1>
        <h2 class="email">{{ user.email }} is your email</h2>
        <label for="fn1">Your firstname</label>
        <input class="fn" readonly :value="user.firstname">
        <br>
        <label for="fn1">Your lastname</label>
        <input class="fn" :value="user.lastname" readonly>
        <br>
      </div>
      <button @click="GetInfo">Get Your Info</button>
    </span>

    <!-- Change user info -->
    <span class="userInfoBox" v-if="listResult.length > 0">
      <h1>Change Here</h1>
      <h2 class="email">{{ listResult[0].email }} your email</h2>
      <label for="fn1">Your new firstname</label>
      <input id="newfirstname" class="fn" v-model="newFirstname">
      <br>
      <label for="fn1">Your new lastname</label>
      <input id="newlastname" class="fn" v-model="newLastname">
      <br>
      <button @click="ChangeInfo">Change your info</button>
    </span>
  </div>
</template>
  
  
  
  
<script setup>
import { ref } from 'vue';

const listResult = ref([]); // Initialize as an empty array
const newFirstname = ref('');
const newLastname = ref('');

const ChangeInfo = async () => {
  const tokenJson = localStorage.getItem('token');

  if (tokenJson) {
    const tokenObj = JSON.parse(tokenJson);
    const token = tokenObj.token;

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "firstname": newFirstname.value,
      "lastname": newLastname.value
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("http://localhost:8080/api/v1/info/changeuser", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  }
};

const GetInfo = async () => {
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
      const response = await fetch("http://localhost:8080/api/v1/info/user", requestOptions);
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        listResult.value = [result]; // Make it an array
        newFirstname.value = result.firstname; // Set values for editing
        newLastname.value = result.lastname;
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

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  <style scoped>
  .fn{
    margin: 50px;
    padding: 10px;
  }
  .container {
    display: flex;
    justify-content: space-between; /* Space out the boxes */
    gap: 20px; /* Optional: Add some space between the boxes */
    margin: 50px;
  }
  
  .userInfoBox {
    border: 1px solid #ccc;
    padding: 10px;
    flex: 1; /* Make both boxes take equal space */
    box-sizing: border-box; /* Ensure padding and border are included in the element's width */
  }
  </style>
  