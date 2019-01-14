// Receive report object as parameter. You must create the report object using powerbi.embed from the powerbi-client library.
const pbiPages = (
  report,
  conf = {
    el: document.getElementById('pbiPagesContainer'),
    defaultPage: 1
  }
) => {
  // Only fires up when the Power BI report is fully loaded.
  report.on('loaded', event => {
    // Build the DOM elements
    const pbiPagesDOM =
      '<div class="pbi-pages"><div class="pbi-pages__previous"><span class="caret-left"></span></div><div class="pbi-pages__next"><span class="caret-right"></span></div><div class="pbi-pages__current"><p class="pbi-pages__current-text"></p><span class="caret-down"></span></div></div><div class="pbi-pages__dropup pbi-pages__dropup--hidden"><ul></ul></div>';

    // By default, the plugin will try to append itself to a div with id 'pbiPagesContainer'. You can override this by passing a configuration object and another value for the 'el' key.

    conf.el.innerHTML = pbiPagesDOM;

    // Get all available pages. getPages is provided by the powerbi library and returns a promise.
    report.getPages().then(pages => {
      // Initialize our current page variable. You can pass this as configuration in the plugin call.
      let curPage = conf.defaultPage;

      // Declaring all DOM elements here for clarity
      const caretDown = document.querySelector('.caret-down');
      const dropup = document.querySelector('.pbi-pages__dropup');
      const curPageDiv = document.querySelector('.pbi-pages__current');
      const curPageText = document.querySelector('.pbi-pages__current-text');
      const prevPage = document.querySelector('.pbi-pages__previous');
      const nextPage = document.querySelector('.pbi-pages__next');

      // Registering all event listeners here for clarity
      curPageDiv.addEventListener('click', () => {
        animateDropup();
      });

      prevPage.addEventListener('click', () => {
        navigate('previous');
      });

      nextPage.addEventListener('click', () => {
        navigate('next');
      });

      // Generate the dropup menu items, insert the report page names into them, then append them to the DOM. Will check if the page is not hidden first. Loading the report with Edit rights shows hidden pages so if you want to use Edit rights you should modify the below check for visibility.

      const fillDropup = () => {
        const ul = dropup.children[0];
        const fragment = document.createDocumentFragment();

        pages.map((page, index) => {
          if (page.visibility === 0) {
            const li = document.createElement('li');
            li.className = 'dropup-item';
            li.id = index;
            li.innerText = page.displayName;
            fragment.appendChild(li);
          }
        });

        ul.appendChild(fragment);
        registerDropupItems(ul.children);
      };

      // Map over all dropup items then listen to click events on them. Also hide the dropup after a selection for better UX.
      const registerDropupItems = list => {
        const arr = Array.from(list);
        arr.map(li => {
          li.addEventListener('click', e => {
            navigate(e.target.id);
            animateDropup();
          });
        });
      };

      // Unhide dropup items hidden by the setActivePage function.
      const updateDropupItems = () => {
        const lis = document.querySelectorAll('.dropup-item');
        const arr = Array.from(lis);

        arr.map(li => {
          li.style.display = 'flex';
        });
      };

      const animateDropup = () => {
        dropup.classList.toggle('pbi-pages__dropup--hidden');
        caretDown.classList.toggle('caret-down--spin');
      };

      // Set the current page as active, hide it from the dropup menu and update the current page display text
      const setActivePage = page => {
        pages[page].setActive().then(() => {
          updateDropupItems();
          document.getElementById(page).style.display = 'none';
          curPageText.textContent = pages[page].displayName;
        });
      };

      // Update the current page variable based on what UI element the user has clicked, then call setActivePage.
      const navigate = direction => {
        if (direction === 'next') {
          if (curPage < pages.length && pages[curPage + 1].visibility === 0) {
            curPage++;
            setActivePage(curPage);
          }
        } else if (direction === 'previous') {
          if (curPage > 0 && pages[curPage - 1].visibility === 0) {
            curPage--;
            setActivePage(curPage);
          }
        } else {
          curPage = parseInt(direction);
          setActivePage(curPage);
        }
      };

      const init = () => {
        fillDropup();
        setActivePage(curPage);
      };

      init();
    });
  });
};

export default pbiPages;
