function findMatch(user_id, restaurant_id) {
    fetch('http://localhost:5000/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id, restaurant_id })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "matched") {
            alert(`จับคู่สำเร็จ! ${data.user1} กับ ${data.user2}`);
        } else {
            alert("กำลังรอเพื่อน...");
        }
    });
}
