fetch('/json/projects.json')
  .then((response) => response.json())
  .then((projects) => {
    const container = document.getElementById('projects-container');
    projects.forEach((project) => {
      const card = document.createElement('div');
     card.className = 'project-card bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden transition transform hover:scale-105 hover:bg-white hover:text-black';

      card.innerHTML = `
        <img src="${project.image}" alt="${project.title}" class="w-full h-48 object-cover">
        <div class="p-4">
          <h3 class="text-xl font-semibold mb-2">${project.title}</h3>
          <p class="mb-4">${project.description}</p>
          <div class="flex gap-2">
            ${project.github ? `<a href="${project.github}" target="_blank" class="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600">GitHub</a>` : ''}
            ${project.liveDemo ? `<a href="${project.liveDemo}" target="_blank" class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500">Live Demo</a>` : ''}
          </div>
        </div>
      `;

      container.appendChild(card);
    });
  });
