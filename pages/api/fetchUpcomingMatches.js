fetch('https://api.balldontlie.io/v1/games?start_date=2024-08-29', {
    headers: {
      'Authorization': 'f6fa58b7-904e-4e35-8705-58e0eed736ac'
    }
  })
    .then(response => response.json())
    .then(data => {
      if (data.data && data.data.length > 0) {
        const game = data.data[0];
        console.log(`Next game: ${game.home_team.full_name} vs ${game.visitor_team.full_name}`);
      } else {
        console.log('No games scheduled for today.');
      }
    })
    .catch(error => console.error('Error fetching data:', error));
  