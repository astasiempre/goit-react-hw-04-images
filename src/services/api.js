import axios from "axios";

export const fetchSerchImages = async (searchName, page = 1, per_page = 12) => {

  const { data }  = await axios.get('https://pixabay.com/api/', {
    params: {
      key: '38912388-dfab1f4f09b0fb6a50a23584e',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
     page,
      q: searchName,
      per_page,
    },
 });
 
   return data;
   
};

