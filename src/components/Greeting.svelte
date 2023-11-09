<script lang="ts">
    const currentTime = new Date()
    const currentHour = currentTime.getHours()

    let greeting = ''

    if(currentHour < 12 && currentHour > 8) {
        greeting = 'Good morning'
    } else if(currentHour < 18 && currentHour > 12) {
        greeting = 'Good afternoon'
    } else {
        greeting = 'Good night'
    }

</script>

<h1 class="text-3xl font-bold">{greeting}</h1>