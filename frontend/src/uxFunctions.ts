
export const clearBoard = () => {
     const cards = document.querySelectorAll('.card');

     cards.forEach((card ) => {
          card.remove();
     });
}

