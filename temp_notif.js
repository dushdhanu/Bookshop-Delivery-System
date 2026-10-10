
        document.addEventListener('DOMContentLoaded', () => {
            // Mark all as read
            const markReadBtn = document.querySelector('.mark-as-read');
            if (markReadBtn) {
                markReadBtn.addEventListener('click', function() {
                    const cards = document.querySelectorAll('.notification-card');
                    if (cards.length === 0) return;
                    
                    Swal.fire({
                title: 'Confirmation',
                text: 'Mark all notifications as read?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3b82f6',
                cancelButtonColor: '#ef4444',
                confirmButtonText: 'Yes'
            }).then((result) => {
                if (result.isConfirmed) {
                    cards.forEach(card => {
                            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                            card.style.opacity = '0';
                            card.style.transform = 'scale(0.95)';
                        });
                        
                        setTimeout(() => {
                            const list = document.querySelector('.notification-list');
                            list.innerHTML = '<div style="text-align: center; color: #94a3b8; padding: 2rem; background-color: #1a1a2e; border-radius: 5px; border: 1px solid #2e5a8a;">You have 0 new notifications</div>';
                        }, 400);
                    }
                });
            });
        }

            // Button actions
            document.querySelectorAll('.notification-actions button').forEach(btn => {
                btn.addEventListener('click', function() {
                    const actionText = this.textContent.trim();
                    if (actionText === 'View Order' || actionText === 'Track Order') {
                        window.location.href = 'orders.html';
                    } else if (actionText === 'Leave Feedback') {
                        Swal.fire({
                            title: 'Please enter your feedback:',
                            input: 'textarea',
                            showCancelButton: true,
                            confirmButtonText: 'Submit Feedback',
                            confirmButtonColor: '#3b82f6',
                            cancelButtonColor: '#ef4444'
                        }).then((result) => {
                            const feedback = result.value;
                            if (feedback && feedback.trim() !== '') {
                                alert('Thank you for your feedback! Your feedback has been recorded.');
                                this.style.display = 'none';
                            }
                        });
                    } else if (actionText === 'View Books' || actionText === 'Shop Now') {
                        window.location.href = 'books.html';
                    } else if (actionText === 'Learn More') {
                        alert('Our privacy policy has been updated to enhance your data protection. You can read the full policy in the footer links.');
                    }
                });
            });

            // Filter functionality
            const filterTags = document.querySelectorAll('.category-tags .tag');
            const notifCards = document.querySelectorAll('.notification-card');
            
            filterTags.forEach(tag => {
                tag.style.cursor = 'pointer'; // Make them look clickable
                tag.addEventListener('click', () => {
                    // Remove active class from all tags
                    filterTags.forEach(t => t.classList.remove('active'));
                    // Add active class to clicked tag
                    tag.classList.add('active');
                    
                    const filter = tag.textContent.trim();
                    
                    notifCards.forEach(card => {
                        const badge = card.querySelector('.notification-badge');
                        const badgeText = badge ? badge.textContent.trim() : '';
                        
                        let shouldShow = false;
                        if (filter === 'All Notifications') {
                            shouldShow = true;
                        } else if (filter === 'My Orders' && badgeText === 'Order Update') {
                            shouldShow = true;
                        } else if (filter === 'New Books' && badgeText === 'New Arrivals') {
                            shouldShow = true;
                        } else if (filter === 'Promotions' && badgeText === 'Promotion') {
                            shouldShow = true;
                        } else if (filter === 'Account' && badgeText === 'Security') {
                            shouldShow = true;
                        }
                        
                        card.style.display = shouldShow ? 'block' : 'none';
                    });
                });
            });
        });
    