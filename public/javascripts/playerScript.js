function navClickEffect() {
  const rankedSolo = document.querySelector('.rank-solo')
  const rankedFlex = document.querySelector('.rank-flex')
  const rankOptions = document.querySelectorAll('.rank-options > li');

  const array = [...rankOptions]
  const rankSoloOptions = array.slice(0, 2)
  const rankFlexOptions = array.slice(2, 4)

  // Rank options for ranked solo
  for (let i = 0; i < rankSoloOptions.length; i++) {
    rankSoloOptions[i].addEventListener('click', () => {
      if (!rankSoloOptions[i].classList.contains('active')) {
        rankedSolo.classList.add('inactive-rank')
        rankedFlex.classList.remove('inactive-rank')
      } 
    })
  }

  // Rank options for ranked flex
  for (let i = 0; i < rankFlexOptions.length; i++) {
    rankFlexOptions[i].addEventListener('click', () => {
      if (!rankFlexOptions[i].classList.contains('active')) {
        rankedFlex.classList.add('inactive-rank')
        rankedSolo.classList.remove('inactive-rank')
      } 
    })
  }
}

(function main() {
  navClickEffect();
})()