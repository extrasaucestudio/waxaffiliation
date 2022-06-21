<!DOCTYPE html>
<html>
<head>
    <title>Stats</title>
    <link rel="shortcut icon" type="image/x-icon" href="favicon.ico">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="main.css">
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-JYGKTZMEDZ"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-JYGKTZMEDZ');
</script>
</head>
<body class="container">
    <div hidden="hidden" class="form-group">
        <label for="eos-account"><strong>Network</strong></label>
        <select onchange="getProducers()" class="form-control" id="network">
            <option value="https://api.hivebp.io">WAX Mainnet</option>
        </select>
    </div>
    <div hidden="hidden" class="form-group">
        <label for="eos-account"><strong>Account Name</strong></label>
        <input id="eos-account" class="form-control" placeholder="EOS Account">
    </div>
    <div hidden="hidden" class="form-group">
        <input type="radio" name="signing-method" onchange="toggleKeyInput()" value="key" checked>
        <label>Private Key</label>
        <input id="private-key" class="form-control" placeholder="Private key">
        </div>
    </div>
    
    <?php include 'menu.php';?>
    <div class="form-group">
        <input type="search" id="filter-prods" class="form-control" placeholder="Filter Players" onkeyup="filterProds()">
    </div>
    <table id="block-producers" class="table">
        <thead><tr>
            <th>Rank</th>
            <th>Players</th>
            <th>Total Votes</th>
            <th>Reward/24h</th>
            
        </tr></thead>
        <tbody></tbody>
    </table>
    <script src="eosjs-browser.js"></script>
    <script src="main.js"></script>
</body>
<head>
</head>
</html>