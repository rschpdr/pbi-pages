import pbiPages from 'pbi-pages';
import * as pbi from 'powerbi-client';

document.querySelector('.close').addEventListener('click', e => {
  document.querySelector('.message').style.display = 'none';
  e.stopPropagation();
});

document.getElementById('btnEmbed').addEventListener('click', () => {
  let embed_token = document.getElementById('txtEmbedToken').value;
  let url = document.getElementById('txtEmbedUrl').value;
  let report_id = document.getElementById('txtReportId').value;

  const models = pbi.models;

  const config = {
    type: 'report',
    tokenType: models.TokenType.Embed,
    accessToken: embed_token,
    embedUrl: url,
    id: report_id,
    permissions: models.Permissions.All,
    settings: {
      filterPaneEnabled: true,
      navContentPaneEnabled: false,
      layoutType: models.LayoutType.MobilePortrait
    }
  };

  // Embed the report and display it within the div container.
  const report = powerbi.embed(document.querySelector('.report'), config);

  // Pass the newly created report object to the plugin
  pbiPages(report);
});
