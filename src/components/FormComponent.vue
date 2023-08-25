<template>
  <div class="app-container">
    <h2>Form</h2>
    <form @submit.prevent="addEntry" class="entry-form">
      <div class="input-container">
      <label for="name">Name</label>
        <div style="display: flex; justify-content: space-between">
        <input v-model="newEntry.name" id="name" style="width: 48%" placeholder="Enter First name">
        <input v-model="newEntry.surname" id="surname" style="width: 48%" placeholder="Enter Surname">
        </div>
      </div>
      <div class="input-container">
      <label for="email">Email</label>
      <input v-model="newEntry.email" id="email" placeholder="Enter email" type="email">
      </div>
      <div class="input-container">
      <label for="age">Age</label>
      <input v-model.number="newEntry.age" id="age" type="number">
      </div>
      <div class="input-container">
      <label for="favoriteColor">Favorite color</label>
      <select v-model="newEntry.color" id="favoriteColor">
        <option value="" disabled>Select a color</option>
        <option v-for="(color, index) in colorOptions" :value="color" :key="index">{{ color }}</option>
      </select>
      </div>
      <div class="input-container">
        <label>Contact preference</label>
        <div class="contact-preference-list">
          <div v-for="(preference, index) in contactPreferences" :key="index" class="contact-preference">
            <input type="checkbox" :id="preference" :value="preference" v-model="newEntry.contactPreferences">
            <label :for="preference">{{ preference }}</label>
          </div>
        </div>
      </div>
      <div class="button-container">
      <button type="submit" class="submit-button">Add Entry</button>
      <button type="button" class="export-button" @click="exportModal = true">Export</button>
      </div>
    </form>
    <div v-if="exportModal" class="modal-overlay" @click="exportModal = false">
      <div class="export-modal">
        <pre>{{ JSON.stringify(entries, null, 2) }}</pre>
        <button @click="exportModal = false" class="close-modal-btn">Close</button>
      </div>
    </div>
    <h2>Entries</h2>
    <TableComponent v-if="entries.length > 0" :entries="entries" :remove-entry="removeEntry" />
    <div class="no-data" v-else>NO DATA</div>
  </div>
</template>

<script>
import TableComponent from "@/components/TableComponent.vue";
import { toast } from "vue3-toastify";
export default {
  components: {TableComponent},
  data() {
    return {
      newEntry: {
        name: '',
        surname: '',
        email: '',
        age: null,
        color: '',
        contactPreferences: [],
      },
      colorOptions: ['red', 'green', 'blue', 'white', 'black'],
      contactPreferences: ['by email', 'by phone', 'via SMS'],
      entries: [],
      exportModal: false,
    };
  },
  methods: {
    addEntry() {
      const validationMessage = this.validate();
      if (validationMessage === 'Form Added Successfully') {
        const newEntryCopy = { ...this.newEntry };
        newEntryCopy.id = Date.now();
        this.entries.push(newEntryCopy);
        this.clearForm();
        toast.success(validationMessage, {
          position: "top-center"
        })
      } else {
        toast.error(validationMessage, {
          position: "top-center"
        })
      }
    },
    validate() {
      const { email, name, surname, age, color, contactPreferences } = this.newEntry;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        return 'Please enter a valid email address.';
      }

      if (!name || !surname || !color) {
        return 'Please fill all fields.';
      }

      if (age <= 0 || age >= 120) {
        return 'Please enter a valid age between 1 and 119.';
      }

      if (contactPreferences.length === 0) {
        return 'Please select at least one contact preference.';
      }

      return 'Form Added Successfully';
    },
    clearForm() {
      this.newEntry = {
        name: '',
        surname: '',
        email: '',
        age: null,
        color: '',
        contactPreferences: [],
      };
    },
    removeEntry(index) {
      this.entries.splice(index, 1);
    },
  },
};
</script>

<style>

body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.input-container {
  display: flex;
  flex-direction: column;
  width: 70%;
  margin: 20px auto;
  justify-content: center;
}

input, select {
  border: none;
  height: 30px;
}

label {
  font-style: italic;
  font-weight: bold;
  display: block;
  margin-right: auto;
  margin-bottom: 10px;
  color: #555;
}

.entry-form {
  background: linear-gradient(135deg, #ffffff 0%, #f7f7f7 70%);
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 8px;
  max-width: 600px;
  margin: 0 auto;
}

.button-container {
  display: flex;
  justify-content: space-around;
}

.export-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.submit-button {
  background-color: #66ff66;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

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

.export-modal {
  text-align: center;
  background-color: white;
  max-width:  80%;
  max-height: 80%;
  height: auto;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow: auto;
}

.close-modal-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.contact-preference-list {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.contact-preference {
  display: flex;
  align-items: center;
}

.contact-preference input[type="radio"] {
  margin-right: 5px;
}

.contact-preference label {
    margin: 0;
}
.no-data {
  text-align: center;
  margin-top: 20px;
  color: #c82333;
  font-weight: bold;
  font-size: 24px;
}
</style>
