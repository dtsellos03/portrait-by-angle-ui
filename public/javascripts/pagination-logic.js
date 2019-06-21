 function generateTemplate(item) {
        return `
            <div class="column">
          <div class="ui segment">
            <a href="${item.src}" target="_blank"  class="ui medium image toPlainImage">
            <img class="pose" src="${item.src}">
            </a>
          </div>
        </div>
      `;
    }

    function renderItems(dataArray) {
        let container = $('#dataContainer');
        container.empty();
        for (let item of dataArray) {
            container.append(generateTemplate(item));
        }
    }

function initiatePagination() {
    $('#mainPaginationContainer').pagination({
        dataSource: globalDataList,
        locator: 'data',
        className: 'paginationjs-theme-green',
        pageSize: 12,
        callback: function(response, pagination) {
            renderItems(response);
        }
    });
}

initiatePagination()

function destroyPagination() {
    $('#mainPaginationContainer').pagination('destroy');
    initiatePagination()
}
