/* Javascript for Vue Website */

// Global event bus.
const eventBus = new Vue();

// Create a new constant Vue instance for notifications.
const notificationApp = new Vue({
	// Data Component.
	data: {
	  notifications: [], // Array to store notifications.
	},
	// Template Component.
	template: `
		<div class="text-center">
			<div v-for="notification in notifications" :key="notification.id" class="notification">
				{{ notification.message }}
			</div>
		</div>
	`,
	// Method Component.
	methods: {
		// Add notification method.
		addNotification(message, type = 'success', duration = 2000) {
			const notification = {
			message,
			type,
			};
	
			this.notifications.push(notification);
	
			setTimeout(() => {
			this.removeNotification(notification);
			}, duration);
		},
		// Remove notification method.
		removeNotification(notification) {
			const index = this.notifications.indexOf(notification);
			if (index !== -1) {
			this.notifications.splice(index, 1);
			}
		},
	},
});

// Mount the notifications Vue instance.
notificationApp.$mount('#notification-app');


// Create a Vue Component called product.
Vue.component('product', {
	// Properties Component.
	props: {
		premium: {
			type: Boolean,
			required: true
		},
		discount: {
			type: Number,
			required: true
		},
		freeshippingoffer: {
			type: Boolean,
			required: true,
		},
		freeshippingvalue: {
			type: Number,
			required: true,
		}
	},

	// Watch Component.
	watch: {
		// Watch for changes in product.selectedColour and update image.
		'product.selectedColour': function (newColour, oldColour) {
		  // When the colour is selected the product image is updated.
		  this.product.image = this.product.images[newColour];
		},
		// Watch for changes in updatedShippingQty and update shippingItem.selectedQty.
		updatedShippingQty(newQty) {
			this.shippingItem.selectedQty = newQty;
		},
	},

	// Data Component. Only static properties that remain the same for each customer go here.
	data() {
		return {	
		selectedRating: 0, // Initialize to 0 for no rating.
		reviewsVisible: false, // Initial state is hidden.
		showReviews: false, // Initial state is hidden.
		discountText: 'Premium Meme-ber Discount', // Discount text for cart and webpage ad.
		discountPercentage: (this.discount * 100).toFixed(), // Discount percentage in text format. USed with discountText.
		// Premium discount item for cart.
		premiumDiscountItem: {
			id: "D",						
		},
		shipping: 9.95, // Shipping value.
		// Shipping item for cart.
		shippingItem: {
			id: "S",
			name: "Shipping",
			selectedQty: 1, // Initialise to default 1. Used to determine how many shipping charges to apply based on cartItemCount using computed updatedShippingQty.
		},
		subtotalItem: {
			name: "Subtotal",
			price: 0.00, // Initialise price to 0.	
		},
		// Notifications array for #app notifications.
		notifications: [],
		// Cart array to store cart items.
		cart: [],
    	showCart: false, // Initial state is hidden.
		cartItemCount: 0, // Initialize cart item count.
		// Products array.
		products: [
		{
			id: 1,
			name: 'Arnold Schwarzenegger',
			images: {
				black: {
				  	front: 'images/arnold_black_front.jpg',
				  	back: 'images/arnold_black_back.jpg',
				},
				white: {
				  	front: 'images/arnold_white_front.jpg',
				  	back: 'images/arnold_white_back.jpg',
				},
			},
			description: 'Unisex, 80% cotton, 20% polyester',
			price: 19.95,
			selectedColour: 'white', // Initial colour. Initialise for deault image.
			selectedSide: 'front', // Initial side.
			selectedSize: 'Size', // Display value string 'Size'.
			// Stock on hand array for both product colors in all sizes with starting values.
			stockOnHand: {
				black: {
					XS: 1,
					S: 5,
					M: 5,
					L: 5,
					XL: 3,
					XXL: 1
				},
				white: {
					XS: 1,
					S: 5,
					M: 5,
					L: 5,
					XL: 3,
					XXL: 1
				}
			},
        	selectedQty: 'Qty', // Display value string 'Qty'.
			showReviewForm: false, // Initial state is hidden.
			reviews: [], // New review array
			showReviews: false,	// Initial state is hidden.
			// New review object.
			newReview: {
			name: '',
			review: '',
			},				
		},
		{
			id: 2,
			name: 'Christian Bale',
			images: {
				black: {
				  	front: 'images/christian_bale_black_front.jpg',
				  	back: 'images/christian_bale_black_back.jpg',
				},
				white: {
				  	front: 'images/christian_bale_white_front.jpg',
				  	back: 'images/christian_bale_white_back.jpg',
				},
			},
			description: 'Unisex, 80% cotton, 20% polyester',
			price: 19.95, // Price value.
			selectedColour: 'white', // Initial colour. Initialise for deault image.
			selectedSide: 'front', // Initial side.
			selectedSize: 'Size', // Display value string 'Size'.
			// Stock on hand array for both product colors in all sizes with starting values.
			stockOnHand: {
				black: {
					XS: 1,
					S: 5,
					M: 5,
					L: 5,
					XL: 3,
					XXL: 1
				},
				white: {
					XS: 1,
					S: 5,
					M: 5,
					L: 5,
					XL: 3,
					XXL: 1
				}
			},
        	selectedQty: 'Qty', // Display value string 'Qty'.
			showReviewForm: false, // Initial state is hidden.
			reviews: [], // New review array
			showReviews: false,	// Initial state is hidden.
			// New review object.
			newReview: {
			name: '',
			review: '',
			},				
		},
		{
			id: 3,
			name: 'Gary Oldman',
			images: {
				black: {
				  	front: 'images/gary_oldman_black_front.jpg',
				  	back: 'images/gary_oldman_black_back.jpg',
				},
				white: {
				  	front: 'images/gary_oldman_white_front.jpg',
				  	back: 'images/gary_oldman_white_back.jpg',
				},
			},
			description: 'Unisex, 80% cotton, 20% polyester',
			price: 19.95,
			selectedColour: 'white', // Initial colour. Initialise for deault image.
			selectedSide: 'front', // Initial side.
			selectedSize: 'Size', // Display value string 'Size'.
			// Stock on hand array for both product colors in all sizes with starting values.
			stockOnHand: {
				black: {
					XS: 1,
					S: 5,
					M: 5,
					L: 5,
					XL: 3,
					XXL: 1
				},
				white: {
					XS: 1,
					S: 5,
					M: 5,
					L: 5,
					XL: 3,
					XXL: 1
				}
			},
        	selectedQty: 'Qty', // Display value string 'Qty'.
			showReviewForm: false, // Initial state is hidden.
			reviews: [], // New review array
			showReviews: false,	// Initial state is hidden.
			// New review object.
			newReview: {
			name: '',
			review: '',
			},				
		},
		{
			id: 4,
			name: 'Gene Wilder',
			images: {
				black: {
				  	front: 'images/gene_wilder_black_front.jpg',
				  	back: 'images/gene_wilder_black_back.jpg',
				},
				white: {
				  	front: 'images/gene_wilder_white_front.jpg',
				  	back: 'images/gene_wilder_white_back.jpg',
				},
			},
			description: 'Unisex, 80% cotton, 20% polyester',
			price: 19.95,
			selectedColour: 'white', // Initial colour. Initialise for deault image.
			selectedSide: 'front', // Initial side.
			selectedSize: 'Size', // Display value string 'Size'.
			// Stock on hand array for both product colors in all sizes with starting values.
			stockOnHand: {
				black: {
					XS: 1,
					S: 5,
					M: 5,
					L: 5,
					XL: 3,
					XXL: 1
				},
				white: {
					XS: 1,
					S: 5,
					M: 5,
					L: 5,
					XL: 3,
					XXL: 1
				}
			},
        	selectedQty: 'Qty', // Display value string 'Qty'.
			showReviewForm: false, // Initial state is hidden.
			reviews: [], // New review array
			showReviews: false,	// Initial state is hidden.
			// New review object.
			newReview: {
			name: '',
			review: '',
			},				
		},
		{
			id: 5,
			name: 'Gerard Butler',
			images: {
				black: {
				  	front: 'images/gerard_butler_black_front.jpg',
				  	back: 'images/gerard_butler_black_back.jpg',
				},
				white: {
				  	front: 'images/gerard_butler_white_front.jpg',
				  	back: 'images/gerard_butler_white_back.jpg',
				},
			},
			description: 'Unisex, 80% cotton, 20% polyester',
			price: 19.95,
			selectedColour: 'white', // Initial colour. Initialise for deault image.
			selectedSide: 'front', // Initial side.
			selectedSize: 'Size', // Display value string 'Size'.
			// Stock on hand array for both product colors in all sizes with starting values.
			stockOnHand: {
				black: {
					XS: 1,
					S: 5,
					M: 5,
					L: 5,
					XL: 3,
					XXL: 1
				},
				white: {
					XS: 1,
					S: 5,
					M: 5,
					L: 5,
					XL: 3,
					XXL: 1
				}
			},
        	selectedQty: 'Qty', // Display value string 'Qty'.
			showReviewForm: false, // Initial state is hidden.
			reviews: [], // New review array
			showReviews: false,	// Initial state is hidden.
			// New review object.
			newReview: {
			name: '',
			review: '',
			},				
		},
		{
			id: 6,
			name: 'Glenn Close',
			images: {
				black: {
				  	front: 'images/glenn_close_black_front.jpg',
				  	back: 'images/glenn_close_black_back.jpg',
				},
				white: {
				  	front: 'images/glenn_close_white_front.jpg',
				  	back: 'images/glenn_close_white_back.jpg',
				},
			},
			description: 'Unisex, 80% cotton, 20% polyester',
			price: 19.95,
			selectedColour: 'white', // Initial colour. Initialise for deault image.
			selectedSide: 'front', // Initial side.
			selectedSize: 'Size', // Display value string 'Size'.
			// Stock on hand array for both product colors in all sizes with starting values.
			stockOnHand: {
				black: {
					XS: 1,
					S: 5,
					M: 5,
					L: 5,
					XL: 3,
					XXL: 1
				},
				white: {
					XS: 1,
					S: 5,
					M: 5,
					L: 5,
					XL: 3,
					XXL: 1
				}
			},
        	selectedQty: 'Qty', // Display value string 'Qty'.
			showReviewForm: false, // Initial state is hidden.
			reviews: [], // New review array
			showReviews: false,	// Initial state is hidden.
			// New review object.
			newReview: {
			name: '',
			review: '',
			},				
		},
		{
			id: 7,
			name: 'Jim Carrey',
			images: {
				black: {
				  	front: 'images/jim_carrey_black_front.jpg',
				  	back: 'images/jim_carrey_black_back.jpg',
				},
				white: {
				  	front: 'images/jim_carrey_white_front.jpg',
				  	back: 'images/jim_carrey_white_back.jpg',
				},
			},
			description: 'Unisex, 80% cotton, 20% polyester',
			price: 19.95,
			selectedColour: 'white', // Initial colour. Initialise for deault image.
			selectedSide: 'front', // Initial side.
			selectedSize: 'Size', // Display value string 'Size'.
			// Stock on hand array for both product colors in all sizes with starting values.
			stockOnHand: {
				black: {
					XS: 1,
					S: 5,
					M: 5,
					L: 5,
					XL: 3,
					XXL: 1
				},
				white: {
					XS: 1,
					S: 5,
					M: 5,
					L: 5,
					XL: 3,
					XXL: 1
				}
			},
        	selectedQty: 'Qty', // Display value string 'Qty'.
			showReviewForm: false, // Initial state is hidden.
			reviews: [], // New review array
			showReviews: false,	// Initial state is hidden.
			// New review object.
			newReview: {
			name: '',
			review: '',
			},				
		},
		{
			id: 8,
			name: 'Kanye West',
			images: {
				black: {
				  	front: 'images/kanya_west_black_front.jpg',
				  	back: 'images/kanya_west_black_back.jpg',
				},
				white: {
				  	front: 'images/kanya_west_white_front.jpg',
				  	back: 'images/kanya_west_white_back.jpg',
				},
			},
			description: 'Unisex, 80% cotton, 20% polyester',
			price: 19.95,
			selectedColour: 'white', // Initial colour. Initialise for deault image.
			selectedSide: 'front', // Initial side.
			selectedSize: 'Size', // Display value string 'Size'.
			// Stock on hand array for both product colors in all sizes with starting values.
			stockOnHand: {
				black: {
					XS: 1,
					S: 5,
					M: 5,
					L: 5,
					XL: 3,
					XXL: 1
				},
				white: {
					XS: 1,
					S: 5,
					M: 5,
					L: 5,
					XL: 3,
					XXL: 1
				}
			},
        	selectedQty: 'Qty', // Display value string 'Qty'.
			showReviewForm: false, // Initial state is hidden.
			reviews: [], // New review array
			showReviews: false,	// Initial state is hidden.
			// New review object.
			newReview: {
			name: '',
			review: '',
			},				
		},
		{
			id: 9,
			name: 'Mark Ruffalo',
			images: {
				black: {
				  	front: 'images/mark_ruffalo_black_front.jpg',
				  	back: 'images/mark_ruffalo_black_back.jpg',
				},
				white: {
				  	front: 'images/mark_ruffalo_white_front.jpg',
				  	back: 'images/mark_ruffalo_white_back.jpg',
				},
			},
			description: 'Unisex, 80% cotton, 20% polyester',
			price: 19.95,
			selectedColour: 'white', // Initial colour. Initialise for deault image.
			selectedSide: 'front', // Initial side.
			selectedSize: 'Size', // Display value string 'Size'.
			// Stock on hand array for both product colors in all sizes with starting values.
			stockOnHand: {
				black: {
					XS: 1,
					S: 5,
					M: 5,
					L: 5,
					XL: 3,
					XXL: 1
				},
				white: {
					XS: 1,
					S: 5,
					M: 5,
					L: 5,
					XL: 3,
					XXL: 1
				}
			},
        	selectedQty: 'Qty', // Display value string 'Qty'.
			showReviewForm: false, // Initial state is hidden.
			reviews: [], // New review array
			showReviews: false,	// Initial state is hidden.
			// New review object.
			newReview: {
			name: '',
			review: '',
			},				
		},
		{
			id: 10,
			name: 'Morgan Freeman',
			images: {
				black: {
				  	front: 'images/morgan_freeman_black_front.jpg',
				  	back: 'images/morgan_freeman_black_back.jpg',
				},
				white: {
				  	front: 'images/morgan_freeman_white_front.jpg',
				  	back: 'images/morgan_freeman_white_back.jpg',
				},
			},
			description: 'Unisex, 80% cotton, 20% polyester',
			price: 19.95,
			selectedColour: 'white', // Initial colour. Initialise for deault image.
			selectedSide: 'front', // Initial side.
			selectedSize: 'Size', // Display value string 'Size'.
			// Stock on hand array for both product colors in all sizes with starting values.
			stockOnHand: {
				black: {
					XS: 1,
					S: 5,
					M: 5,
					L: 5,
					XL: 3,
					XXL: 1
				},
				white: {
					XS: 1,
					S: 5,
					M: 5,
					L: 5,
					XL: 3,
					XXL: 1
				}
			},
        	selectedQty: 'Qty', // Display value string 'Qty'.
			showReviewForm: false, // Initial state is hidden.
			reviews: [], // New review array
			showReviews: false,	// Initial state is hidden.
			// New review object.
			newReview: {
			name: '',
			review: '',
			},				
		},
		{
			id: 11,
			name: 'Rainn Wilson',
			images: {
				black: {
				  	front: 'images/rainn_wilson_black_front.jpg',
				  	back: 'images/rainn_wilson_black_back.jpg',
				},
				white: {
				  	front: 'images/rainn_wilson_white_front.jpg',
				  	back: 'images/rainn_wilson_white_back.jpg',
				},
			},
			description: 'Unisex, 80% cotton, 20% polyester',
			price: 19.95,
			selectedColour: 'white', // Initial colour. Initialise for deault image.
			selectedSide: 'front', // Initial side.
			selectedSize: 'Size', // Display value string 'Size'.
			// Stock on hand array for both product colors in all sizes with starting values.
			stockOnHand: {
				black: {
					XS: 1,
					S: 5,
					M: 5,
					L: 5,
					XL: 3,
					XXL: 1
				},
				white: {
					XS: 1,
					S: 5,
					M: 5,
					L: 5,
					XL: 3,
					XXL: 1
				}
			},
        	selectedQty: 'Qty', // Display value string 'Qty'.
			showReviewForm: false, // Initial state is hidden.
			reviews: [], // New review array
			showReviews: false,	// Initial state is hidden.
			// New review object.
			newReview: {
			name: '',
			review: '',
			},				
		},
		{
			id: 12,
			name: 'Ray Charles',
			images: {
				black: {
				  	front: 'images/ray_charles_black_front.jpg',
				  	back: 'images/ray_charles_black_back.jpg',
				},
				white: {
				  	front: 'images/ray_charles_white_front.jpg',
				  	back: 'images/ray_charles_white_back.jpg',
				},
			},
			description: 'Unisex, 80% cotton, 20% polyester',
			price: 19.95,
			selectedColour: 'white', // Initial colour. Initialise for deault image.
			selectedSide: 'front', // Initial side.
			selectedSize: 'Size', // Display value string 'Size'.
			// Stock on hand array for both product colors in all sizes with starting values.
			stockOnHand: {
				black: {
					XS: 1,
					S: 5,
					M: 5,
					L: 5,
					XL: 3,
					XXL: 1
				},
				white: {
					XS: 1,
					S: 5,
					M: 5,
					L: 5,
					XL: 3,
					XXL: 1
				}
			},
        	selectedQty: 'Qty', // Display value string 'Qty'.
			showReviewForm: false, // Initial state is hidden.
			reviews: [], // New review array
			showReviews: false,	// Initial state is hidden.
			// New review object.
			newReview: {
			name: '',
			review: '',
			},				
		},
		{
			id: 13,
			name: 'Reece Witherspoon',
			images: {
				black: {
				  	front: 'images/reece_witherspoon_black_front.jpg',
				  	back: 'images/reece_witherspoon_black_back.jpg',
				},
				white: {
				  	front: 'images/reece_witherspoon_white_front.jpg',
				  	back: 'images/reece_witherspoon_white_back.jpg',
				},
			},
			description: 'Unisex, 80% cotton, 20% polyester',
			price: 19.95,
			selectedColour: 'white', // Initial colour. Initialise for deault image.
			selectedSide: 'front', // Initial side.
			selectedSize: 'Size', // Display value string 'Size'.
			// Stock on hand array for both product colors in all sizes with starting values.
			stockOnHand: {
				black: {
					XS: 1,
					S: 5,
					M: 5,
					L: 5,
					XL: 3,
					XXL: 1
				},
				white: {
					XS: 1,
					S: 5,
					M: 5,
					L: 5,
					XL: 3,
					XXL: 1
				}
			},
        	selectedQty: 'Qty', // Display value string 'Qty'.
			showReviewForm: false, // Initial state is hidden.
			reviews: [], // New review array
			showReviews: false,	// Initial state is hidden.
			// New review object.
			newReview: {
			name: '',
			review: '',
			},				
		},
		{
			id: 14,
			name: 'Rob Lowe',
			images: {
				black: {
				  	front: 'images/rob_lowe_black_front.jpg',
				  	back: 'images/rob_lowe_black_back.jpg',
				},
				white: {
				  	front: 'images/rob_lowe_white_front.jpg',
				  	back: 'images/rob_lowe_white_back.jpg',
				},
			},
			description: 'Unisex, 80% cotton, 20% polyester',
			price: 19.95,
			selectedColour: 'white', // Initial colour. Initialise for deault image.
			selectedSide: 'front', // Initial side.
			selectedSize: 'Size', // Display value string 'Size'.
			// Stock on hand array for both product colors in all sizes with starting values.
			stockOnHand: {
				black: {
					XS: 1,
					S: 5,
					M: 5,
					L: 5,
					XL: 3,
					XXL: 1
				},
				white: {
					XS: 1,
					S: 5,
					M: 5,
					L: 5,
					XL: 3,
					XXL: 1
				}
			},
        	selectedQty: 'Qty', // Display value string 'Qty'.
			showReviewForm: false, // Initial state is hidden.
			reviews: [], // New review array
			showReviews: false,	// Initial state is hidden.
			// New review object.
			newReview: {
			name: '',
			review: '',
			},				
		},
		{
			id: 15,
			name: 'Robert De Niro',
			images: {
				black: {
				  	front: 'images/robert_de_niro_black_front.jpg',
				  	back: 'images/robert_de_niro_black_back.jpg',
				},
				white: {
				  	front: 'images/robert_de_niro_white_front.jpg',
				  	back: 'images/robert_de_niro_white_back.jpg',
				},
			},
			description: 'Unisex, 80% cotton, 20% polyester',
			price: 19.95,
			selectedColour: 'white', // Initial colour. Initialise for deault image.
			selectedSide: 'front', // Initial side.
			selectedSize: 'Size', // Display value string 'Size'.
			// Stock on hand array for both product colors in all sizes with starting values.
			stockOnHand: {
				black: {
					XS: 1,
					S: 5,
					M: 5,
					L: 5,
					XL: 3,
					XXL: 1
				},
				white: {
					XS: 1,
					S: 5,
					M: 5,
					L: 5,
					XL: 3,
					XXL: 1
				}
			},
        	selectedQty: 'Qty', // Display value string 'Qty'.
			showReviewForm: false, // Initial state is hidden.
			reviews: [], // New review array
			showReviews: false,	// Initial state is hidden.
			// New review object.
			newReview: {
			name: '',
			review: '',
			},				
		},
		{
			id: 16,
			name: 'Thor',
			images: {
				black: {
				  	front: 'images/thor_black_front.jpg',
				  	back: 'images/thor_black_back.jpg',
				},
				white: {
				  	front: 'images/thor_white_front.jpg',
				  	back: 'images/thor_white_back.jpg',
				},
			},
			description: 'Unisex, 80% cotton, 20% polyester',
			price: 19.95,
			selectedColour: 'white', // Initial colour. Initialise for deault image.
			selectedSide: 'front', // Initial side.
			selectedSize: 'Size', // Display value string 'Size'.
			// Stock on hand array for both product colors in all sizes with starting values.
			stockOnHand: {
				black: {
					XS: 1,
					S: 5,
					M: 5,
					L: 5,
					XL: 3,
					XXL: 1
				},
				white: {
					XS: 1,
					S: 5,
					M: 5,
					L: 5,
					XL: 3,
					XXL: 1
				}
			},
        	selectedQty: 'Qty', // Display value string 'Qty'.
			showReviewForm: false, // Initial state is hidden.
			reviews: [], // New review array
			showReviews: false,	// Initial state is hidden.
			// New review object.
			newReview: {
			name: '',
			review: '',
			},				
		},
		{
			id: 17,
			name: 'Willem Dafoe',
			images: {
				black: {
				  	front: 'images/willem_dafoe_black_front.jpg',
				  	back: 'images/willem_dafoe_black_back.jpg',
				},
				white: {
				  	front: 'images/willem_dafoe_white_front.jpg',
				  	back: 'images/willem_dafoe_white_back.jpg',
				},
			},
			description: 'Unisex, 80% cotton, 20% polyester',
			price: 19.95,
			selectedColour: 'white', // Initial colour. Initialise for deault image.
			selectedSide: 'front', // Initial side.
			selectedSize: 'Size', // Display value string 'Size'.
			// Stock on hand array for both product colors in all sizes with starting values.
			stockOnHand: {
				black: {
					XS: 1,
					S: 5,
					M: 5,
					L: 5,
					XL: 3,
					XXL: 1
				},
				white: {
					XS: 1,
					S: 5,
					M: 5,
					L: 5,
					XL: 3,
					XXL: 1
				}
			},
        	selectedQty: 'Qty', // Display value string 'Qty'.
			showReviewForm: false, // Initial state is hidden.
			reviews: [], // New review array
			showReviews: false,	// Initial state is hidden.
			// New review object.
			newReview: {
			name: '',
			review: '',
			},				
		}
		],
	}},

	// Template Component.
	template: `
		<div>
			<div>
				<!-- Ad Banner -->
				<div class="banner">
					<div v-if="freeshippingoffer">
						<p>Free Shipping when you spend &dollar;{{ freeshippingvalue }} or more!</p>
					</div>
				</div>
				<!-- Display message for premium/non-premium members -->
				<div class="text-center">
					<div v-if="premium">
						<p>Enjoy Your {{ discountText }} ({{ discountPercentage }}%) Off Items!</p>
					</div>
					<div v-else>
						<p>Upgrade to premium for exclusive benefits!</p>
					</div>
				</div>

				<!-- Shopping cart icon and counter container -->
				<div class="shopping-cart" @click="toggleCart">
					<i class="fas fa-shopping-cart fa-2x"></i>
					<!-- Shopping cart counter -->
					<div class="cart-counter">{{ cartItemCount }}</div>
				</div>

				<!-- Product component template -->
				<div class="row">
					<div v-for="product in products" :key="product.id" class="col-lg-4 col-md-6 col-sm-12">
						<div class="product-card">
							<h2 class="text-center mt-2">{{ product.name }}</h2>
							<!-- Div for product price -->
							<div>
								<p class="text-center" style="padding-top:5px; font-weight: bold;">&dollar;{{ product.price }}</p>
							</div>
							<img :src="product.images[product.selectedColour][product.selectedSide]" alt="Product Image" class="img-fluid">
							<!-- Div to change image and button colour based on product colour choice -->
							<div class="row d-flex justify-content-center">
							<div class="col-3 text-right">
								<button @click="changeImage(product, 'front', $event)" class="btn" :class="{ 'btn-secondary': product.selectedSide !== 'front', 'btn-primary': product.selectedSide === 'front' }">Front</button>
							</div>
							<div class="col-3 text-left">
								<button @click="changeImage(product, 'back', $event)" class="btn" :class="{ 'btn-secondary': product.selectedSide !== 'back', 'btn-primary': product.selectedSide === 'back' }" style="padding-left: 14px; padding-right: 14px;">Back</button>
							</div>
							</div>
							</div>							
							<div class="row">  					
								<!-- Div to loop through product description array and list contents -->  
								<div class="col-6">
									<div class="product-card h-100">
										<h6>Description</h6>
										<hr>
										<!-- Padding for line break effect -->
										<div class="padding">
										</div>
										<ul style="text-align: left;">
											<li class="pb-2" v-for="item in product.description.split(', ')">{{ item }}</li>
										</ul>
									</div>
								</div>							
								<div class ="col-6">  
									<div class="product-card h-100">
									<h6>Select</h6>
										<hr>
										<!-- Div for product colour selection -->
										<div class="row">
											<div class="col-6 d-flex align-items-center justify-content-end">
												<label for="colourSelect" class="text-right">Colour:</label>
											</div>
											<div class="col-6 text-center">
												<select v-model="product.selectedColour" class="form-control" id="colourSelect" :style="{ width: '100%' }">
													<option value="black">Black</option>
													<option value="white">White</option> <!-- Default option - Could not use 'Colour' option as needed a display image -->
												</select>
											</div>
										</div>
										<div class="row pt-2">
											<!-- Div for product size selection -->
											<div class="col-6 d-flex align-items-center justify-content-end">
												<label for="sizeSelect" class="text-right">Size:</label>
											</div>
											<div class="col-6 text-center">
												<select v-model="product.selectedSize" class="form-control" id="sizeSelect" :style="{ width: '100%' }">
													<option value="Size">Size</option> <!-- Default option -->
													<option value="XS">XS</option>
													<option value="S">S</option>
													<option value="M">M</option>
													<option value="L">L</option>
													<option value="XL">XL</option>
													<option value="XXL">XXL</option>
												</select>
											</div>
										</div>
										<div class="row p-2">
											<!-- Div for product SOH display based on colour and size -->
											<div class="col-6 d-flex align-items-center justify-content-end">
											<label for="sizeSelect" class="text-right">Stock:</label>
											</div>
											<div class="col-6 d-flex align-items-center justify-content-start">
												<div class="stock-on-hand-box ml-2">
													<span v-if="product.selectedSize !== 'Size' && product.selectedColour !== 'Colour'">
														{{ product.stockOnHand[product.selectedColour][product.selectedSize] }}
													</span>
												</div>
											</div>
										</div>
										<div class="row">
											<!-- Div for product quantity selection -->
											<div class="col-6 d-flex align-items-center justify-content-end">
												<label for="qtySelect" class="text-right">Qty:</label>
											</div>
											<div class="col-6 text-center">
												<select v-model="product.selectedQty" class="form-control" id="qtySelect" :style="{ width: '100%' }">
													<option value="Qty">Qty</option> <!-- Default option -->
													<option value="1">1</option>
													<option value="2">2</option>
													<option value="3">3</option>
													<option value="4">4</option>
													<option value="5">5</option>
												</select>
											</div>
										</div>
									</div>
								</div>
							</div>
							<!-- Padding for line break effect -->
							<div class="padding">
							</div>
							<!-- Add to cart button. Hidden unless valid selections made. -->
							<div>
								<button @click="addToCart(product)" class="btn btn-success btn-primary mx-auto d-block" v-if="validateSelection(product)">Add to Cart</button>
							</div>
							<!-- Padding for line break effect -->
							<div class="padding">
							</div>
							<!-- Div for view cart button -->
							<div>
								<button @click="toggleCart" class="btn btn-primary mx-auto d-block" v-if="cartItemCount > 0">View Cart</button>
							</div>
							<!-- Review Butttons - Use ternary operator to switch button text and class binding to change colour -->
							<div class="row">
								<div class="col-6">
									<div class="text-center mt-2">
										<button @click="toggleShowReviews(product)" class="btn" :class="{ 'btn-secondary': product.showReviews, 'btn-warning': !product.showReviews }">
											{{ product.showReviews ? 'Close Reviews' : 'Show Reviews' }}
										</button>
									</div>
								</div>
								<div class="col-6">
									<div class="text-center mt-2">
										<button @click="toggleAddReviewForm(product)" class="btn" :class="{ 'btn-secondary': product.showReviewForm, 'btn-warning': !product.showReviewForm }">
											{{ product.showReviewForm ? 'Cancel Review' : 'Add a Review' }}
										</button>
									</div>
								</div>								
							</div>
							
							<!-- Add Review Form -->
							<div v-if="product.showReviewForm" style="display: flex; flex-direction: column; align-items: center; margin-top: 20px;">
								<input v-model="product.newReview.name" placeholder="Your Name" style="margin: 10px 0;" required>
								<textarea v-model="product.newReview.review" placeholder="Your Review" style="margin: 10px 0; width: 100%;" required></textarea>
								<!-- Star rating review section -->
								<div class="star-rating">
									<span
									v-for="star in 5"  
									:key="star"
									@click="selectRating(star)"
									:class="{ 'selected': star <= selectedRating }"
									>
									★ 
									</span>
								</div>
								<!-- Padding for line break effect -->
								<div class="padding">
								</div>
								<button @click="addReview(product)" class="btn btn-primary">Submit</button>
							</div>
							
							<!-- Show Reviews Section -->
							<div v-if="product.showReviews" class="reviews-section mt-2 text-center">								
								<!-- Display default message for no reviews else display reviews -->
								<div v-if="product.reviews.length === 0">
									<p>This product has not been reviewed yet.</p>
								</div>
								<div v-else>
									<h2>Reviews</h2>
									<div v-for="(review, index) in product.reviews" :key="index" class="review-box">
										<p>
											<strong>{{ review.name }} says:</strong>
											<span class="styled-quote">"{{ review.review }}"</span>
											<div class="star-rating">
												<span
													v-for="star in 5"
													:key="star"
													:class="{ 'selected': star <= review.selectedRating }"
												>
													★ 
												</span>
											</div>
										</p>                           
									</div>
								</div>
							</div>		
							<hr>			
						</div>
					</div>
				</div>
				<!-- End Product component template -->

				<!-- Shopping Cart Pop-up -->
				<div v-if="showCart" class="cart-popup">
					<h3 v-if="cart.length === 0">Your Shopping Cart is Empty</h3>
					<h3 v-else>Your Shopping Cart</h3>
					<!-- Display table headers -->
					<table class="table">
						<thead>
							<tr>
								<th>ID</th>
								<th>Item</th>
								<th>Colour</th>
								<th>Size</th>
								<th>Quantity</th>
								<th style="text-align: right">Price</th>
								<th></th> <!-- Empty header for the Remove button -->
							</tr>
						</thead>
						<tbody>
							<!-- Populate cart table data -->
							<tr v-for="(item, index) in cart" :key="index">
								<td>#{{ item.id }}</td>
								<td>{{ item.name }}</td>
								<td>{{ item.selectedColour }}</td>
								<td>{{ item.selectedSize }}</td>
								<td>{{ item.selectedQty }}</td>
								<td style="text-align: right">{{ (item.selectedQty * item.price).toFixed(2) }}</td>
								<td style="text-align: center"><button @click="removeFromCart(index)">Remove</button></td>
							</tr>
							<!-- Add a space between cart items -->
							<tr>
								<td colspan="4"></td>
								<td colspan="3"></td>
							</tr>
							<tr>
								<td></td> <!-- No id for discount item -->
								<td>{{ subtotalItem.name }}</td>
								<td></td> <!-- No colour for discount item -->
								<td></td> <!-- No size for discount item -->
								<td></td> <!-- No quantity for discount item --> 
								<td style="text-align: right">{{ cartSubtotal }}</td> 
								<td></td> <!-- Empty cell for Remove button -->
							</tr>
							<!-- Add a space between cart items -->
							<tr>
								<td colspan="4"></td>
								<td colspan="3"></td>
							</tr>						
							<!-- Display the Premium Discount item row if the customer is premium -->
							<tr v-if="premium">
								<td>{{ premiumDiscountItem.id }}</td>
								<td>{{ discountText }} ({{ discountPercentage }}%)</td>
								<td></td> <!-- No colour for discount item -->
								<td></td> <!-- No size for discount item -->
								<td></td> <!-- No quantity for discount item -->     
								<!-- Calculate the premium discount on the items in the table (excluding shipping) -->                     
								<td style="text-align: right">						
									-{{ (cartSubtotal * discount).toFixed(2) }}
								</td>
								<td></td> <!-- Empty cell for Remove button -->
							</tr>
							<!-- Display the Shipping item -->
							<tr v-if="cart.length > 0">
								<td>{{ shippingItem.id }}</td>
								<td v-if="freeshippingoffer"> 
									<span v-if="totalCartValue < freeshippingvalue">{{ shippingItem.name }}</span>
									<span v-else>Free Shipping</span>
								</td>
								<td v-else>
									<span>{{ shippingItem.name }}</span>
								</td>
								<td v-else>{{ shippingItem.name }}</td>
								<td></td> <!-- No colour for shipping item -->
								<td></td> <!-- No size for shipping item -->
								<td></td> <!-- No qty for shipping item -->
								<!-- Determine shipping costs based on item price total -->
								<td v-if="freeshippingoffer" style="text-align: right">
									<span v-if="totalCartValue < freeshippingvalue">{{ (shipping * shippingItem.selectedQty).toFixed(2) }}</span>
									<span v-else style="text-decoration: line-through">{{ (shipping * shippingItem.selectedQty).toFixed(2) }}</span>
								</td>
								<td v-else style="text-align: right">
									<span>{{ (shipping * shippingItem.selectedQty).toFixed(2) }}</span>
									
								</td>
								<td style="text-align: center"><button @click="clearCart">Clear Cart</button></td> <!-- Clear Cart button in the shipping row -->
							</tr>
							</tbody>
						</table>
					<p>Total: &dollar;{{ cartGrandTotal }}</p> <!-- Use the computed property for grand total -->
					<!-- Checkout button -->
					<button @click="checkout" class="btn btn-success mx-auto d-block" v-if="cart.length > 0">Checkout</button>
					<!-- Padding for line break effect -->
					<div class="padding">
					</div>
					<!-- Close Cart button -->
					<button @click="toggleCart" class="btn btn-primary mx-auto d-block">Close Cart</button>
				</div>
			</div>
		</div>
	`,

	// Method Component.
	methods: {
		// Clear cart method.
		clearCart() {
			// Iterate through the items in the cart and add them back to the SOH.
			for (const removedItem of this.cart) {
				// Find the corresponding product in the products array based on the removed item's product id.
				const product = this.products.find((p) => p.id === removedItem.id);
			
				if (product) {
					// Increment the SOH for the removed item's colour and size.
					product.stockOnHand[removedItem.selectedColour][removedItem.selectedSize] += parseInt(removedItem.selectedQty);
				}
			}
		
			// Clear the cart by setting it to an empty array.
			this.cart = [];
			this.cartItemCount = 0;
		},

		// Method to set the star rating from user click.
		selectRating(rating) {
			this.selectedRating = rating;
		},

		// Method to toggle the review form.
		toggleAddReviewForm(product) {
			product.showReviewForm = !product.showReviewForm;
	
			// Clear the new review fields when toggling.
			if (!product.showReviewForm) {
				product.newReview.name = '';
				product.newReview.review = '';
			}
		},

		// Method to toggle the reviewsVisible property.
		toggleShowReviews(product) {
			product.showReviews = !product.showReviews;		
			this.reviewsVisible = !this.reviewsVisible;
		},
		// Method to toggle reviews visibility.
		toggleReviews(product) {
			product.showReviews = true;
			product.showReviewForm = false;
		},
	
		// Method to toggle add review form visibility.
		toggleAddReview(product) {
			product.showReviewForm = true;
			product.showReviews = false;
		
			// Clear the new review fields when toggling.
			if (!product.showReviewForm) {
			product.newReview.name = '';
			product.newReview.review = '';
			}
		},

		// Method to toggle the review form for a specific product (and not all of them on one product card!).
		toggleReviewForm(product) {
			product.showReviewForm = !product.showReviewForm;
			// Clear the new review fields when toggling
			if (!product.showReviewForm) {
			  product.newReview.name = '';
			  product.newReview.review = '';
			}
		},
		
		// Method to add a review.
		addReview(product) {
			// User validation check if the review has a name, review text, and a star rating.
			if (
				product.newReview.name.trim() !== '' &&
				product.newReview.review.trim() !== '' &&
				this.selectedRating > 0 // Ensure a rating is selected with 1 star minimum.
			) {
				// Create the review object with the selected rating.
				const review = {
					name: product.newReview.name,
					review: product.newReview.review,
					selectedRating: this.selectedRating,
				};
	
				// Push the review to the product's reviews array.
				product.reviews.push(review);
	
				// Clear the form fields and selected rating.
				product.newReview.name = '';
				product.newReview.review = '';
				this.selectedRating = 0; // Reset the selected rating

				// Show the reviews by toggling the reviews button on.
				this.toggleShowReviews(product);

				// Hide the review form after successfully submitting.
				product.showReviewForm = false;
				// Show the review after successfully submitting (work-around).
				product.showReviews = true;
	
				// Show a notification message.
				notificationApp.addNotification(
					`Your review for ${product.name} Meme-Tee has been submitted.`,
					'success',
					2000 // Duration in milliseconds (2 seconds in this example)
				);

			} else {
				alert('Please provide your name, review, and select a rating.');
			}
		},
		
		// Method to toggle the display of reviews for a specific product (and not all of them on one product card!).
		toggleShowReviews(product) {
			product.showReviews = !product.showReviews;
			// Hide the review form when showing the reviews.
			product.showReviewForm = false;
		},

		// Add to cart method.
		addToCart(product) {
			// Check if there is stock available for the selected size and colour.
			const selectedProduct = this.products.find((p) => p.id === product.id);
			if (
				!selectedProduct ||
				!selectedProduct.stockOnHand[product.selectedColour] ||
				selectedProduct.stockOnHand[product.selectedColour][product.selectedSize] < product.selectedQty
			) {
				alert('Sorry, the selected size and colour are out of stock or the quantity exceeds the available stock.');
				return; // Prevent adding to the cart.
			}
		
			if (this.validateSelection(product)) {
				const productName = `${product.name} Meme-Tee`; // Variable name to append Meme-Tee in the product name for comparison in the next section.
				// Check if a cart item with the same name colour and size already exists.
				const cartItemIndex = this.cart.findIndex((item) => {
					return (
						item.name === productName &&
						item.selectedColour === product.selectedColour &&
						item.selectedSize === product.selectedSize
					);
				});
		
				if (cartItemIndex !== -1) { // -1 is used as a return value to indicate that the item being searched for is not in the cart.
					// If the same item exists, update its quantity and subtotal without adding the product again.
					const existingItem = this.cart[cartItemIndex];
					existingItem.selectedQty = parseInt(existingItem.selectedQty) + parseInt(product.selectedQty);
					existingItem.subtotal = existingItem.selectedQty * existingItem.price;
				} else {
					// Otherwise, add the item to the cart with the selected quantity.
					const cartItem = {
						id: product.id,
						name: productName,
						price: product.price,
						selectedColour: product.selectedColour,
						selectedSize: product.selectedSize,
						selectedQty: product.selectedQty,
					};
					this.cart.push(cartItem); // Add to cart array.
				}
		
				// Update the SOH for the selected size and colour by subtracting the quantity added to the cart.
				if (selectedProduct.stockOnHand[product.selectedColour]) {
					selectedProduct.stockOnHand[product.selectedColour][product.selectedSize] -= parseInt(
						product.selectedQty
					);
				}			

				// Emit a custom event to the event bus. Used to notify other parts of the application when an item is added to the cart. 
				eventBus.$emit('addToCart', product); // Good practice but not used in this assignment.
		
				// Increment the cart item count by the selected quantity.
				this.cartItemCount += parseInt(product.selectedQty);
		
				// Show a notification message.
				notificationApp.addNotification(
					`${product.name} Meme-Tee has been added to the cart.`,
					'success',
					2000 // Duration in milliseconds (2 seconds in this example)
				);
				// Reset quantity value to Qty.
        		product.selectedQty = 'Qty';

			} else {
				alert('Please select colour, size, and quantity before adding to cart.');
			}
		},

		// Method to toggle the visibility of the cart
		toggleCart() {
		this.showCart = !this.showCart;
		},

		// Method to check if colour, size, and quantity have been selected.
		validateSelection(product) {
		return (
			product.selectedSize !== 'Size' &&
			product.selectedQty !== 'Qty'
		);
		},

		// Method to update product image with the selected side.
		changeImage(product, side, event) {
            // Update the selected side
            product.selectedSide = side;
        },

		// Method to toggle the visibility of the cart.
		displayCart() {
			this.showCart = !this.showCart;
		},

		// Method to define max quantity of qty selection menu (Does not limit item qauntity that can be added to cart repeatedly).
		getQtyOptions(product) {
			const maxQty = 5; // Define your maximum quantity here
			const availableQty = maxQty - this.getCartItemCount(product);
			return Array.from({ length: availableQty }, (_, i) => i + 1);
		},	

		// Method to calculate the quantity of the selected product in the cart.
		getCartItemCount(product) {
			return this.cart.reduce((count, item) => {
				if (
					item.name === product.name &&
					item.selectedColour === product.selectedColour &&
					item.selectedSize === product.selectedSize
				) {
					return count + item.quantity;
				}
				return count;
			}, 0);
		},

		// Method to remove items from cart.
		removeFromCart(index) {
			const removedItem = this.cart.splice(index, 1)[0]; // Remove the item from the cart.
			const removedSubtotal = removedItem.selectedQty * removedItem.price; // Calculate subtotal of removed item.
			this.cartTotal -= removedSubtotal; // Subtract the removed item's subtotal from the cart total.
			this.cartItemCount -= removedItem.selectedQty; // Decrement the cart item count by the quantity of the removed item.
		
			// Find the corresponding product in the products array based on the removed item's product id.
			const product = this.products.find((p) => p.id === removedItem.id);
		
			if (product) {
				// Increment the SOH for the removed item's colour and size.
				product.stockOnHand[removedItem.selectedColour][removedItem.selectedSize] += parseInt(
					removedItem.selectedQty
				);
			}
		},

		// Checkout method. 
		checkout() {
			if (this.cart.length === 0) {
				// Show a notification if the cart is empty
				notificationApp.addNotification("Your cart is empty. Please add items before checking out.", "error");
			} else {
				// Clear the cart.
				this.cart = [];
				// Reset the cartItemCount to zero.
				this.cartItemCount = 0;
				
				// Display success message.
				notificationApp.addNotification(
					'Thank you for shopping with us!',
					'success',
					2000 // Duration in milliseconds (2 seconds in this example)
				);
		
				// Close the cart after a delay
				setTimeout(() => {
					this.showCart = false;
				}, 2000); // Delay in milliseconds (3 seconds in this example)									
			}
		},
	},

	// Computed Component.
	computed: {	
		// Method to calculate shipping item qty based off cart count.
		updatedShippingQty() {
			// Calculate the new shippintItem.selectedQty based on cartItemCount.
			return Math.ceil(this.cartItemCount / 5); // Math.ceil rounds number up to the nearest whole number. 1 shipping unit for every 5 items.
		},
		// Method to toggle reviews button text using ternary operator.
		showReviewsButtonText() {
			return this.reviewsVisible ? 'Close Reviews' : 'Show Reviews';
		},		

		// Method to calculate the item subtotal for each product.
		cartSubtotal() {
			let subtotal = 0; // Initialise subtotal.
			// Iterate through cart items and calculate their subtotals.
			for (const item of this.cart) {
			  subtotal += item.selectedQty * item.price;
			}
			return subtotal.toFixed(2); // Format with two decimal places.
		},

		// Method to calculate the total cart value before discounts (used for determining total item value for free shipping).
		totalCartValue() {
			let cartValue = 0;
			for (const item of this.cart) {
			  cartValue += item.selectedQty * item.price;
			}
			return cartValue.toFixed(2);
		},

		// Calculate the total including product items, premium discount item if any, and shipping item if any.
		cartGrandTotal() {
		// Calculate the total for product items.
		const productTotal = this.cart.reduce((total, item) => {
			// Calculate the subtotal for each product item.
			const subtotal = item.selectedQty * item.price;
			// Add the subtotal to the running total.
			return total + subtotal;
		}, 0);
	
		// Assign variable for discount subtraction.
		let discountValue = this.cartSubtotal * this.discount;
		// Apply the premium discount to the grand total if the user is a premium customer.
		let grandTotal = this.premium ? (productTotal - (discountValue).toFixed(2)) : productTotal;
	
		// Calculate the total including shipping if cart is not empty.
		if (this.cartItemCount > 0) {
			// Check if the total cart value is less than freeshippingvalue using totalCartValue method value.
			if (this.totalCartValue < this.freeshippingvalue) {
			// Add the shipping charge.
			grandTotal += this.shipping.toFixed(2) * this.shippingItem.selectedQty;
			}
		}
	
		// Return the grand total and format to two decimal places.
		return grandTotal.toFixed(2);
		},
	},
});

// Create a new dynamic vue instance called #app. Only dynamic properties specific to each user login go here.
new Vue({
	el: '#app',
	data: {
		// Change properties as required.
		premium: true, // Toggle premium customer.
		discount: 0.1, // Discount value changes calculation and discount text in ad and cart.
		freeshippingoffer: true, // Toggle free shipping offer.
		freeshippingvalue: 50, // Changes calculation for free shipping offer and ad banner text.
	}
});


