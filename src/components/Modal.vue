<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal-content">
      <button class="close-button" @click="closeModal">X</button>
      <h3>User ID: {{ userId }}</h3> <!-- Display the userId here if needed -->
      <h3>Car Details</h3>
      <ul>
        <li v-for="car in carDetails" :key="car.id" :class="{'deleted': deletedCars.has(car.id)}">
          {{ car.make }} | {{ car.model }} | {{ car.year }} | {{ car.type }} |
          <span v-if="car.type === 'SUPER'"> horsepower = {{ car.horsepower }}</span> 
          <span v-if="car.type === 'CHEAP'"> price = {{ car.price }}</span> 
          <button :class="{'not': deletedCars.has(car.id)}" @click="deleteCar(car.id, userId, index)">Delete</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps(['carDetails', 'show', 'userId']);
const emit = defineEmits(['update:show']);

const deletedCars = ref(new Set());

const closeModal = () => {
  emit('update:show', false);
};

const deleteCar = async (carId) => {
  const tokenJson = localStorage.getItem('token');

  if (tokenJson) {
    const tokenObj = JSON.parse(tokenJson);
    const token = tokenObj.token;

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      carId: carId,
      userId: props.userId
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    try {
      const response = await fetch("http://localhost:8080/api/v1/info/delete", requestOptions);
      const result = await response.text();

      if (response.ok) {
        deletedCars.value.add(carId);  // Add carId to deletedCars set
      } else {
        console.error(result);
      }
    } catch (error) {
      console.error(error);
    }
  }
};


</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  width: 80%;
  max-width: 600px;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: red;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
}
.deleted {
  color: red;
  text-decoration: line-through;
}
.not {
  display: none;
}
</style>
