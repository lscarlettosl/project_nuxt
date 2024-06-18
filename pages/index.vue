
<script setup>
import { useRouter } from 'vue-router';
import { useAuth } from '#imports';

const router = useRouter();
const { data } = useAuth();

if (data.value.user.role === 'admin') {
    router.push({ path: '/admin' });
} else {
    router.push({ path: '/profile' });
}
</script>
