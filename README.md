# Next.js Frontend and Data Processing Service for AURA Project.

> Developed in conjunction with Professor Shahriar Nijron and Mahathir Monjur.

### Project Details:
* Frontend built in Next.JS, Chart.JS for data visualization.
* Custom data processing service and API. API pulls time series data from MongoDB database where data is then processed into arrays of classifications with heuristic timestamps. This is then formatted for Chart.JS and displayed. Users can select a given day and recieve new charts.
* Given the inconsistent nature of timestamps, algorithm bins classifications that within three second intervals and computes the sum activity from those timestamps.

  
**George Harris, 2024.**
