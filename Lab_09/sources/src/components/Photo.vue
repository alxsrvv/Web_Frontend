<template>
  <div class="lightbox" @click.self="closeLightbox">
    <img id="prev" :src="prev.filename" @click="ch_prev(prev.id)">
    <img id="centre" :src="photo.filename">
    <img id="next" :src="next.filename" @click="ch_next(next.id)">
  </div>
</template>

<script>
let ch_index_prev = 0;
let ch_index_next = 0;
let ch_bool_prev = false;
let ch_bool_next = true;
import { photos } from './Gallery.vue';
export default {
  name: 'Photo',
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
    next() {
      return this.photos.find((photo) => {
        if ((photo.id-1) === Number(this.$route.params.id))
          return (photo.id-1) === Number(this.$route.params.id);
        else 
          return (photo.id+photos.length-1) === Number(this.$route.params.id);
      }); 
    },
    prev() {
      return this.photos.find((photo) => {
        if ((photo.id+1) === Number(this.$route.params.id))
          return (photo.id+1) === Number(this.$route.params.id);
        else 
          return (photo.id-photos.length+1) === Number(this.$route.params.id)
      }); 
    },
  },
  
  methods: {
    closeLightbox() {
      this.$router.push('/');
      ch_bool_prev = false;
      ch_bool_next = false;
    },
    ch_prev(ind) {
      if (ch_bool_prev == false) {
        ch_index_prev = ind;
        ch_bool_prev = true;
      }
      let centre = document.getElementById('centre');
      centre.setAttribute('src', photos[ch_index_prev].filename);
      let prev = document.getElementById('prev');
      prev.setAttribute('src', ch_index_prev!=0?photos[ch_index_prev-1].filename:photos[photos.length-1].filename);
      let next = document.getElementById('next');
      next.setAttribute('src', ch_index_prev!=photos.length-1?photos[ch_index_prev+1].filename:photos[0].filename);
      if (ch_index_prev == 0) {
        ch_index_prev = photos.length;
      }
      ch_index_prev -= 1;
    },
    ch_next(ind) {
      if (ch_bool_next == false) {
        ch_index_next = ind; 
        ch_bool_next = true;
      }
      let centre = document.getElementById('centre');
      centre.setAttribute('src', photos[ch_index_next].filename);
      let next = document.getElementById('next');
      next.setAttribute('src', ch_index_next!=photos.length-1?photos[ch_index_next+1].filename:photos[0].filename);
      let prev = document.getElementById('prev');
      prev.setAttribute('src', ch_index_next!=0?photos[ch_index_next-1].filename:photos[photos.length-1].filename);
      if (ch_index_next == photos.length-1) {
        ch_index_next = -1;
      }
      ch_index_next += 1;
    }
  },
};
</script>

<style>
  .lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 2rem;
  }
  .lightbox img {
    margin: auto;
    width: 100%;
    transition-timing-function: linear;
    animation-duration: 0.5s;
    animation-name: animat;
  }

  @keyframes animat {
    from {
      transform: scale(0.5);
    } 
    to {
      transform: scale(1);
    }
  }
  
  #next {
    width: 40%;
    margin-right: 5%;
  }

  #prev {
    width: 40%;
    margin-left: 5%;
  }
</style>