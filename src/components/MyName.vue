<template>
  <h1>Enter you name</h1>
  <div>
   {{ firstName }}
  <span>
   {{ lastName }}
  </span>
   </div>
   <div>
    <small>
<span   :class="status ? 'selected' : 'unselected'" style="display: inline-block;">Status:</span>
<span>&#20;{{ status }}</span>
<div>
  <button 
  :style="{
  visibility: status ? 'visible' : 'hidden'
  }"
  @click="onResetClick">Reset</button>
</div>
    </small>
   </div>
</template>

<script>
export default { 
  name: "MyName",
    props:{
    status: {
    type: String,
    default: "-"
    },
  },
  emits: ['reset'],
  data: () => ({
  firstName: 'S',
  lastName: 'Vasyutkin'
  }),
methods: {
  onResetClick() {
  console.log('> MyName -> onResetClick');
  this.$emit('reset')
  }
},
}; 
</script>

<style scoped>
.selected {
color: rgb(0, 157, 255);
}
.unselected {
color: red;
}
</style>