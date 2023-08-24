<template>
  <div class="entries-container">
    <table class="entry-table">
      <thead>
      <tr>
        <th>Name</th>
        <th>Surname</th>
        <th>Email</th>
        <th>Age</th>
        <th>Favorite Color</th>
        <th>Contact Preferences</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(entry) in entries" :key="entry.id" class="entry-row">
        <td>{{ entry.name }}</td>
        <td>{{ entry.surname }}</td>
        <td>{{ entry.email }}</td>
        <td>{{ entry.age }}</td>
        <td>{{ entry.color }}</td>
        <td>{{ entry.contactPreferences }}</td>
        <td><button class="remove-button" @click="showDialog = true">Remove</button></td>
      </tr>
      </tbody>
    </table>
    <confirmation-dialog v-show="showDialog" @confirm="confirmRemove" @cancel="showDialog = false" />
  </div>
</template>

<script>

import ConfirmationDialog from "@/components/ConfirmationDialog.vue";

export default {
  components: { ConfirmationDialog },
  data() {
    return {
      showDialog: false,
    };
  },
  props: {
    entries: {
      type: Array,
      required: true
    },
    removeEntry: {
      type: Function,
      required: true
    }
  },
  methods: {
    confirmRemove() {
           this.removeEntry()
           this.showDialog = false;
      },
 }
}

</script>

<style scoped>
.entries-container {
  margin-top: 20px;
  padding: 10px;
  overflow-x: auto;
  border: 1px solid #cccccc;
  border-radius: 5px;
}

.entry-table {
  width: 100%;
  border-collapse: collapse;
}

.entry-row {
  border-bottom: 1px solid #ccc;
}

.entry-row td {
  padding: 10px;
  text-align: center;
}

.entry-row:last-child {
  border-bottom: none;
}

.remove-button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.remove-button:hover {
  background-color: #c82333;
}

</style>
