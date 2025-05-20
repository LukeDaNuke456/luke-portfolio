fetch("json/projects.json")
  .then((response) => response.json())
  .then((projects) => {
    const container = document.getElementById("projects-container");
    projects.forEach((project) => {
      const card = document.createElement("div");
      card.className =
        "project-card bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden transition transform hover:scale-105";

      const img = document.createElement("img");
      img.src = project.image;
      img.alt = project.title;
      img.className = "w-full h-48 object-cover";
      card.appendChild(img);

      const content = document.createElement("div");
      content.className = "p-4";

      const title = document.createElement("h3");
      title.className = "text-xl font-semibold mb-2";
      title.textContent = project.title;
      content.appendChild(title);

      const description = document.createElement("p");
      description.className = "mb-4";
      description.textContent = project.description;
      content.appendChild(description);

      const linksContainer = document.createElement("div");
      linksContainer.className = "flex gap-2";

      if (project.github) {
        const githubLink = document.createElement("a");
        githubLink.href = project.github;
        githubLink.target = "_blank";
        githubLink.rel = "noopener noreferrer";
        githubLink.textContent = "GitHub";
        githubLink.className =
          "bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600";
        linksContainer.appendChild(githubLink);
      }

      if (project.liveDemo) {
        const liveDemoLink = document.createElement("a");
        liveDemoLink.href = project.liveDemo;
        liveDemoLink.target = "_blank";
        liveDemoLink.rel = "noopener noreferrer";
        liveDemoLink.className =
          "bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500";
        liveDemoLink.textContent = "Live Demo";
        linksContainer.appendChild(liveDemoLink);
      }

      content.appendChild(linksContainer);
      card.appendChild(content);

      container.appendChild(card);
    });
  })
  .catch((error) => {
    console.error("Failed to fetch projects:", error);
    const container = document.getElementById("projects-container");
    container.innerHTML =
      '<p class="text-red-500">Failed to load projects. Please try again later.</p>';
  });
