<script setup lang="ts">
import { onLaunch } from "@dcloudio/uni-app";

import { initSafeAreaInsert } from "@/utils/tools";

onLaunch(() => {
  initSafeAreaInsert()
});
</script>
<style></style>
