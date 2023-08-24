<template>
  <div class="modal-overlay" @click="$emit('cancel')">
    <div class="modal">
      <h6>Are You Sure?</h6>
      <p>Once deleted, your information cannot be restored.</p>
      <div class="button-container">
        <button class="confirm-button" @click="$emit('confirm')">Confirm</button>
        <button class="cancel-button" @click="$emit('cancel')">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}

</script>

<style scoped>

.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
}

.modal {
  text-align: center;
  background-color: white;
  width: 80%;
  max-width: 500px;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.button-container {
  display: flex;
  justify-content: space-around;
  margin-top: 40px;
}

h6 {
  font-weight: 500;
  font-size: 24px;
  margin-bottom: 10px;
}

p {
  font-size: 16px;
  margin-bottom: 20px;
}

.confirm-button,
.cancel-button {
  padding: 8px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.confirm-button {
  background-color: #dc3545;
  color: white;
  border: none;
}

.cancel-button {
  background-color: #ccc;
  color: #333;
  border: none;
}

@media (max-width: 600px) {
  .modal {
    width: 70%;
    padding: 20px;
  }
}

</style>

