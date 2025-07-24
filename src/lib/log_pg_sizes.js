export function logPageSectionSizes() {
    const sections = document.querySelectorAll('main >div[id]');
    console.clear();
    console.table(
      Array.from(sections).map((section) => {
        const rect = section.getBoundingClientRect();
        return {
          Section: `#${section.id}`,
          Width: `${rect.width.toFixed(1)}px`,
          Height: `${rect.height.toFixed(1)}px`,
        };
      })
    );
  }
  