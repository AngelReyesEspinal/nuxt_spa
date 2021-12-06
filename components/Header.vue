<template>
  <div class="header-links">
    <NuxtLink  to="/" class="link">Single Game Tickets</NuxtLink > |
    <NuxtLink  to="/giveaways" class="link">Giveaway</NuxtLink >
    <br/>
  </div>
</template>
<style scoped>
.header-links{
  margin-top: 10px;
  padding: 0px 10px 10px 10px;
}
.link{
  text-decoration: none;
  font-family: "Agency fb";
  font-size: 24px;
  color: #000;
}
.link:hover{
  color: red;
}
</style>
