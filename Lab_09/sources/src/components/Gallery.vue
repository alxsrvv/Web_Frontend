<template>
  <div>
    <div id="app">
      <div v-if="!image">
        <h2>Виберіть фото</h2>
        <input type="file" id="addImage" multiple accept="image/*" @change="onFileChange">
      </div>
    </div>
    <div class="gallery">
      <div class="gallery-panel"
         v-for="photo in photos"
         :key="photo.id">
        <router-link :to="`/photo/${photo.id}`">
        <img :src="photo.filename">
        </router-link>
        <div><button :id="photo.id" @click="removeImage">Видалити фото</button></div>
      </div>
    </div>
  </div>
</template>

<script>
export let photos = 
[
];

import { callbackify } from 'util';
export default {
  name: 'Gallery',
  data() {
    return {
      photos,
    };
  },
  computed: {
    photo() {
      return this.photos.find((photo) => {
        return photo.id === Number(this.$route.params.id);
      });
    },
  },
  methods: {
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var reader = new FileReader();
      
      reader.onload = (e) => {
        let ind = 0;
        if (photos.length != 0) {
          ind = photos[photos.length - 1].id + 1;
        }
        photos.push({ id: ind, filename: e.target.result });
      };
      reader.readAsDataURL(file);
    },
    removeImage() {
      let ind = event.toElement.id;
      for (let i = 0; i < photos.length; i += 1) {
        if (ind == photos[i].id) {
          photos.splice(i, 1);
          break;
        }
      }
      for (let i = 0; i < photos.length; i += 1) {
        photos[i].id = i;
      } 
    }
  },
};
</script>

<style>
  #app {
    text-align: center;
  }

  .gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
    grid-gap: 1rem;
    max-width: 80rem;
    margin: 5rem auto;
    margin-left: 5%;
    padding: 0 5rem;
  }
  
  .gallery-panel img {
    width: 60%;
    height: 12vw;
    object-fit: cover;
    border-radius: 0.75rem;
  }
</style>