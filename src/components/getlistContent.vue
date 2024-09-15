<template>
  <button @click="getlist" id="listB">Press to Sign</button>
  <div>
    <div v-for="(user, index) in listResult" :key="index">
      <p class="liste" @click="openModal(user.id)">
        {{ user.id }} | {{ user.email }} | {{ user.firstname }} | {{ user.lastname }}
      </p>
      <br>
    </div>
  </div>

  <!-- Modal component -->
  <Modal :carDetails="carDetails" :show="isModalVisible" @update:show="isModalVisible = $event" :userId="userid" @update:carDetails="carDetails = $event"/>
</template>

<script setup>
import { ref } from 'vue';
import Modal from './Modal.vue'; // Import the Modal component

const listResult = ref([]);
const carDetails = ref([]);
const userid = ref(null); // Initialize userid with null
const isModalVisible = ref(false); // Reactive variable to control modal visibility

const openModal = async (id) => {
  const tokenJson = localStorage.getItem('token');

  if (tokenJson) {
    const tokenObj = JSON.parse(tokenJson);
    const token = tokenObj.token;

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "id": id,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    try {
      const response = await fetch("http://localhost:8080/api/v1/info/car", requestOptions);
      if (response.ok) {
        const result = await response.json();
        carDetails.value = result; // Save the car details to the reactive variable
        isModalVisible.value = true; // Show the modal
        userid.value = id; // Set the user ID
      } else {
        console.error(`Error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error(error);
    }
  }
};

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
