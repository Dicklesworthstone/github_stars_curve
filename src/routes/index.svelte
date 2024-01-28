<script>
  import { onMount } from 'svelte';
  
  let repoData = [];

  async function loadData() {
    // Example range, adjust as needed
    const starsRange = [100, 200, 300, 400, 500]; // etc.
    for (const stars of starsRange) {
      const response = await fetch(`/data?stars=${stars}`);
      if (response.ok) {
        const data = await response.json();
        repoData.push(data);
      }
    }
  }

  onMount(loadData);
</script>

<!-- Your HTML here to display repoData -->
<style>
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
  }
  .repo-list {
    list-style: none;
    padding: 0;
  }
  .repo-item {
    background-color: #f3f4f6;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  .repo-item h3 {
    margin: 0;
    font-size: 1.2em;
  }
  .repo-item p {
    margin: 5px 0 0;
    font-size: 0.9em;
    color: #555;
  }
</style>

<div class="container">
  <h1>GitHub Repositories</h1>
  <ul class="repo-list">
    {#each repoData as data}
      <li class="repo-item">
        <h3>{data.stars} Stars</h3>
        <p>Repository Count: {data.count}</p>
      </li>
    {/each}
  </ul>
</div>