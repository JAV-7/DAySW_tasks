export default class Pokemon {
    /**
     * 
     * @param {*} param0 
     */
    constructor({ id, name, types, sprites }) {
      this.id = id
      this.name = name
      this.types = types.map((typeinfo) => typeinfo.type.name)
      this.image = sprites.front_default
    }
  
    /**
     * 
     */
    renderCard() {
      const card = document.createElement("div")
      card.classList.add("col")
  
      // Create type badges
      const typeBadges = this.types
        .map((type) => {
          const color = "#A8A878"
          return `<span class="badge rounded-pill me-1" style="background-color: ${color}">${type.toUpperCase()}</span>`
          /*
           * <span class="badge rounded-pill me-1" style="background-color: ${color}">
           *    ${type.toUpperCase()}
           * </span>
           */
        })
        .join("")
  
      card.innerHTML = `
              <div class="card h-100">
                  <div class="card-header text-end text-muted">#${this.id.toString().padStart(3, "0")}</div>
                  <img src="${this.image}"
                      class="card-img-top" alt="${this.name}">
                  <div class="card-body">
                      <h5 class="card-title">${this.name.toUpperCase()}</h5>
                      <div class="card-text">
                          ${typeBadges}
                      </div>
                  </div>
              </div>
          `
      return card
    }
  }
  
  