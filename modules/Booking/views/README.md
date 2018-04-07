---
imports:
	'ReactBookingSystem': '../../../docs/src/components/Pages/ModuleDocs/Booking/ReactBookingSystem/ReactBookingSystem.lazyLoaded'
	'OriginalReactBookingSystem': '../../../docs/src/components/Pages/ModuleDocs/Booking/ReactBookingSystem/ReactBookingSystem'
---

# <ReactBookingSystem />

## Installation
```bash
npm install react-booking-system --save
```

## Demo
```jsx show-source
<ReactBookingSystem
	allowedBookingHours={[
		{
			start: 8,
			end: 12,
		},
		{
			start: 13,
			end: 17,
		},
		{
			start: 18,
			end: 21,
		},
	]}
	currentBookings={[
		{
   		start: 8.5,
   		end: 10,
   	},
   	{
   		start: 14,
   		end: 15,
   	},
   	{
   		start: 15,
   		end: 16.5,
   	},
   	{
   		start: 19,
   		end: 20,
   	},
   ]}
   legendItemsCount={14}
/>
```

## Props
[PROPS_TABLE(OriginalReactBookingSystem)]