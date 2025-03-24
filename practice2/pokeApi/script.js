import Pokemon from "./pokemon.js"

const ITEMS_PER_PAGE = 12; // Number of Pokemon per page
let currentPage = 1; //Start at page one
let totalPokemon = 0; //0 pokemon at page 1
let totalPages = 0; // 0 pages when running

//
const pokedex = document.getElementById("pokedex");
//
const paginationContainer = document.getElementById("pagination");

/**
 * 
 * @param {*} page 
 */
async function loadPokedex(page = 1) {
  try {
    // Clear the current Pokemon display
    pokedex.innerHTML = "";

    // Show loading indicator
    pokedex.innerHTML =
      '<div class="col-12 text-center"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>';
    /* Loading screen when awaiting data
     * <div class="col-12 text-center">
     *    <div class="spinner-border" role="status">
     *      <span class="visually-hidden">Loading...
     *      </span>
     *    </div>
     * </div>
     *
     */

    // Calculate the offset based on the current page
    const offset = (page - 1) * ITEMS_PER_PAGE;

    // Fetch Pokemon data with pagination parameters
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${ITEMS_PER_PAGE}`)
    // Transform data to json 
    const data = await response.json()

    // Update total count and pages
    totalPokemon = data.count;
    //ceil() returns the smallest integer greater than or equal to its numeric argument
    totalPages = Math.ceil(totalPokemon / ITEMS_PER_PAGE);

    // Clear content
    pokedex.innerHTML = ""

    //Get contents
    const pokemonPromises = data.results.map((pokemon) => loadPokemonDetails(pokemon.url))
    //Ensures that the function will continue execution only once all the Pokémon details have been loaded
    await Promise.all(pokemonPromises)

    // Update pagination controls
    updatePaginationControls()
  } catch (error) {
    console.error("Error in loading :( ", error)
    pokedex.innerHTML = '<div class="col-12 text-center text-danger">Error loading Pokemon. Please try again.</div>'
    /* 
     * <div class="col-12 text-center text-danger">
     *    Error loading Pokemon. Please try again.
     * </div>
     *
     */
  }
}

/**
 * loadPokemonDetails
 * Receives url, transforms the object to json and then to a Pokemon object
 * Afterwards, it renders the Pokemon details in the pokedex
 * If not successful, it thow an error
 * @param {*} url 
 */
async function loadPokemonDetails(url) {
  try {
    const response = await fetch(url)
    const data = await response.json()
    const pokemonObj = new Pokemon(data)
    pokedex.appendChild(pokemonObj.renderCard())
  } catch (error) {
    console.error("Error in loadPokemonDetails :,( : ", error)
  }
}

/**
 * Function to update the pagination controls in the Pokedex interface.
 * It updates the page navigation, including previous/next buttons, page numbers, and page info.
 */
function updatePaginationControls() {
  // Clear any existing pagination controls in the container
  paginationContainer.innerHTML = ""

  // Create a <nav> element for accessibility (ARIA label)
  const paginationNav = document.createElement("nav")
  paginationNav.setAttribute("aria-label", "Pokedex pagination")

  // Create an unordered list to hold the pagination items (pages, prev/next buttons)
  const paginationList = document.createElement("ul")
  paginationList.className = "pagination justify-content-center"

  // Create "Previous" button
  const prevItem = document.createElement("li")
  // Disable "Previous" button if we're on the first page
  prevItem.className = `page-item ${currentPage === 1 ? "disabled" : ""}`

  const prevLink = document.createElement("a")
  prevLink.className = "page-link"
  prevLink.href = "#"
  prevLink.textContent = "Previous"
  // Add event listener for click (move to previous page if possible)
  prevLink.addEventListener("click", (e) => {
    e.preventDefault()
    if (currentPage > 1) {
      currentPage-- // Decrease page number
      loadPokedex(currentPage) // Reload Pokedex with the new page
    }
  })

  prevItem.appendChild(prevLink)
  paginationList.appendChild(prevItem)

  // Page numbers
  // Determine the range of pages to display around the current page
  const startPage = Math.max(1, currentPage - 2) // Start from two pages before the current one (minimum 1)
  const endPage = Math.min(totalPages, currentPage + 2) // End at two pages after the current one (maximum totalPages)

  // Add first page button if it's not within the visible range
  if (startPage > 1) {
    const firstPageItem = createPageItem(1) // Create the first page item
    paginationList.appendChild(firstPageItem)

    // If the first page is far from the current page, add an ellipsis
    if (startPage > 2) {
      const ellipsisItem = document.createElement("li")
      ellipsisItem.className = "page-item disabled"
      ellipsisItem.innerHTML = '<span class="page-link">...</span>'
      paginationList.appendChild(ellipsisItem)
    }
  }

  // Add page numbers within the range
  for (let i = startPage; i <= endPage; i++) {
    const pageItem = createPageItem(i) // Create page item for each page in range
    paginationList.appendChild(pageItem)
  }

  // Add last page button if it's not within the visible range
  if (endPage < totalPages) {
    // If the last page is far from the current page, add an ellipsis
    if (endPage < totalPages - 1) {
      const ellipsisItem = document.createElement("li")
      ellipsisItem.className = "page-item disabled"
      ellipsisItem.innerHTML = '<span class="page-link">...</span>'
      paginationList.appendChild(ellipsisItem)
    }

    const lastPageItem = createPageItem(totalPages) // Create the last page item
    paginationList.appendChild(lastPageItem)
  }

  // Create "Next" button
  const nextItem = document.createElement("li")
  // Disable "Next" button if we're on the last page
  nextItem.className = `page-item ${currentPage === totalPages ? "disabled" : ""}`

  const nextLink = document.createElement("a")
  nextLink.className = "page-link"
  nextLink.href = "#"
  nextLink.textContent = "Next"
  // Add event listener for click (move to next page if possible)
  nextLink.addEventListener("click", (e) => {
    e.preventDefault()
    if (currentPage < totalPages) {
      currentPage++ // Increase page number
      loadPokedex(currentPage) // Reload Pokedex with the new page
    }
  })

  nextItem.appendChild(nextLink)
  paginationList.appendChild(nextItem)

  // Append the pagination list to the nav element
  paginationNav.appendChild(paginationList)

  // Append the pagination controls to the container
  paginationContainer.appendChild(paginationNav)

  // Display page info (current page number, total pages, total Pokémon)
  const pageInfo = document.createElement("div")
  pageInfo.className = "text-center mt-2"
  pageInfo.textContent = `Page ${currentPage} of ${totalPages} (Total Pokémon: ${totalPokemon})`
  paginationContainer.appendChild(pageInfo)
}

/**
 * Helper function to create a pagination item for a given page number.
 * @param {number} pageNumber - The page number to create the item for.
 * @returns {HTMLLIElement} pageItem - The pagination list item element.
 */
function createPageItem(pageNumber) {
  // Create a list item for the page number
  const pageItem = document.createElement("li")
  pageItem.className = `page-item ${pageNumber === currentPage ? "active" : ""}` // Highlight active page

  const pageLink = document.createElement("a")
  pageLink.className = "page-link"
  pageLink.href = "#"
  pageLink.textContent = pageNumber
  // Add event listener for click (load the page when clicked)
  pageLink.addEventListener("click", (e) => {
    e.preventDefault()
    currentPage = pageNumber // Set the current page to the clicked page
    loadPokedex(currentPage) // Reload Pokedex with the new page
  })

  pageItem.appendChild(pageLink)
  return pageItem
}

// Initialize the Pokedex with the first page on page load
loadPokedex(currentPage)
