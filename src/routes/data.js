import { RepoData, initialize } from '$lib/db';

async function fetchGitHubData(minStars) {
  const url = `https://api.github.com/search/repositories?q=stars:>${minStars}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.total_count;
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    return null;
  }
}

async function getRepoData(stars) {
  await initialize(); // Ensure the database is initialized

  const data = await RepoData.findOne({ where: { stars } });
  if (data && new Date() - new Date(data.timestamp) < 5 * 24 * 60 * 60 * 1000) {
    // Data is less than 5 days old
    return data.count;
  } else {
    // Fetch new data from GitHub
    const count = await fetchGitHubData(stars);
    if (count !== null) {
      if (data) {
        await RepoData.update({ count, timestamp: new Date() }, { where: { stars } });
      } else {
        await RepoData.create({ stars, count, timestamp: new Date() });
      }
    }
    return count;
  }
}

export async function get({ query }) {
  const stars = query.get('stars');
  if (!stars) {
    return { status: 400, body: 'Stars parameter is required' };
  }

  const count = await getRepoData(parseInt(stars, 10));
  if (count !== null) {
    return { status: 200, body: { stars, count } };
  } else {
    return { status: 500, body: 'Error fetching data' };
  }
}
