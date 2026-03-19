async function loadProjects() {
  const container = document.getElementById("projects-container");
  try {
    const response = await fetch("json/projects.json");
    const projects = await response.json();

    container.innerHTML = projects
      .map(
        ({ title, description, image, github, liveDemo, tags }, index) => `
      <div class="bg-white/5 backdrop-blur-md text-white rounded-xl shadow-lg overflow-hidden border border-white/10 transition-all duration-300 hover:scale-[1.02] hover:bg-white/10 hover:shadow-xl fade-in flex flex-col" style="transition-delay: ${index * 100}ms">
        <div class="relative group overflow-hidden">
          <img src="${image}" alt="${title}" class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div class="absolute inset-0 bg-red-900/0 group-hover:bg-red-900/20 transition-colors duration-300"></div>
        </div>
        <div class="p-5 flex flex-col flex-1">
          <h3 class="text-xl font-semibold mb-1 text-white">${title}</h3>
          ${
            tags?.length
              ? `<div class="flex flex-wrap gap-1 mb-3">${tags.map((t) => `<span class="text-xs px-2 py-0.5 rounded-full bg-red-950 text-red-400 border border-red-900">${t}</span>`).join("")}</div>`
              : ""
          }
          <p class="text-gray-400 text-sm mb-4">${description}</p>
          <div class="flex gap-2 mt-auto">
            ${github ? `<a href="${github}" target="_blank" rel="noopener noreferrer" class="text-sm px-3 py-1.5 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-colors">GitHub</a>` : ""}
            ${liveDemo ? `<a href="${liveDemo}" target="_blank" rel="noopener noreferrer" class="text-sm px-3 py-1.5 rounded-lg bg-red-700 text-white hover:bg-red-600 transition-colors">Live Demo</a>` : ""}
          </div>
        </div>
      </div>
    `,
      )
      .join("");

    window.initFadeObserver?.();
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    container.innerHTML =
      '<p class="text-red-400 col-span-full text-center">Failed to load projects. Please try again later.</p>';
  }
}

loadProjects();
