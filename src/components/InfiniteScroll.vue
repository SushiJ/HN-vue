<template>
  <div
    class="infinite-scroll-container"
    @scroll="handleScroll"
    ref="scrollContainer"
  >
    <!-- List of items -->
    <div v-for="item in items" :key="item.id" class="item">
      <p>{{ item.name }}</p>
    </div>

    <!-- Loading indicator -->
    <div v-if="isLoading" class="loading">
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [], // Array to store items
      isLoading: false, // Flag to check if loading is in progress
      currentPage: 1, // Pagination or offset for API request
      hasMore: true, // Flag to check if there is more data to load
    };
  },
  methods: {
    // Function to handle scroll event
    handleScroll() {
      const container = this.$refs.scrollContainer;
      const bottom =
        container.scrollHeight === container.scrollTop + container.clientHeight;

      // If we're at the bottom and no request is ongoing
      if (bottom && !this.isLoading && this.hasMore) {
        this.loadMore();
      }
    },

    // Function to load more data
    async loadMore() {
      this.isLoading = true;

      try {
        // Simulating an API request
        const newItems = await this.fetchData(this.currentPage);

        if (newItems.length > 0) {
          this.items.push(...newItems); // Add the new items to the list
          this.currentPage += 1; // Increment page for the next request
        } else {
          this.hasMore = false; // No more items to load
        }
      } catch (error) {
        console.error("Error loading more data:", error);
      } finally {
        this.isLoading = false;
      }
    },

    // Simulate an API request for data
    async fetchData(page) {
      // This is just a simulated delay and API call for demonstration purposes
      return new Promise((resolve) => {
        setTimeout(() => {
          // Simulating data fetching
          const mockData = Array.from({ length: 10 }, (_, i) => ({
            id: `item-${page}-${i}`,
            name: `Item ${page * 10 + i + 1}`,
          }));
          resolve(mockData);
        }, 1000); // 1 second delay
      });
    },
  },

  // Automatically load the first set of data when component is mounted
  mounted() {
    this.loadMore();
  },
};
</script>

<style scoped>
.infinite-scroll-container {
  height: 400px;
  overflow-y: auto;
}

.item {
  padding: 10px;
  border: 1px solid #ccc;
  margin: 5px;
}

.loading {
  text-align: center;
  padding: 20px;
}
</style>
