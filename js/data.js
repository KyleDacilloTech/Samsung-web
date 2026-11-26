/* Edit this file: add a product here and it automatically gets a product page. */
/* Menu links are 'Label|category' ('s' = support page, 'e' = Galaxy AI page). */
const NAV=[
 {t:'Mobile',c:{Smartphones:['Galaxy S Series|phones','Galaxy Z Fold|phones','Galaxy Z Flip|phones'],Tablets:['Galaxy Tab S|phones'],Wearables:['Galaxy Watch|wearables','Galaxy Ring|wearables']}},
 {t:'TV & Audio',c:{TVs:['Neo QLED 8K|tvs','The Frame|tvs','Crystal UHD|tvs'],Audio:['Soundbars|audio','Galaxy Buds|audio']}},
 {t:'Appliances',c:{Kitchen:['Refrigerators|appliances'],Laundry:['Washers|appliances']}},
 {t:'Computing',c:{Laptops:['Galaxy Book|computing'],Monitors:['Odyssey Monitors|computing']}},
 {t:'Explore',c:{Discover:['Galaxy AI|e','Photo Assist|e','Live Translate|e']}},
 {t:'Support',c:{Help:['Contact us|s','Warranty|s','Order status|s'],Downloads:['Manuals|s','Software|s']}}
];
const CATN={phones:'Phones & tablets',tvs:'TVs',appliances:'Appliances',computing:'Computing',wearables:'Wearables',audio:'Audio'};
const CATS=Object.keys(CATN).map(k=>[CATN[k].split(' ')[0],k]);
/* P(id, category, name, price, description, image file, 'Colour:hex,...', 'Spec=value|Spec=value', {tag, s:storage options, h:1 = show on home}) */
const col=s=>s.split(',').map(x=>{const[n,h]=x.split(':');return[n,'#'+h]});
const P=(id,cat,n,p,d,img,c,k,o={})=>({id,cat,n,p,d,img,c:col(c),k:k.split('|').map(x=>x.split('=')),...o});
const PRODUCTS=[
 P('s-ultra','phones','Galaxy S Ultra',1299,'Titanium frame, 200MP camera and Galaxy AI.','phone-ultra','Titanium Black:2a2b2e,Titanium Gray:8d8f94,Titanium Blue:5b6f8a','Display=6.9" Dynamic AMOLED 2X|Camera=200MP quad|Battery=5,000 mAh',{tag:'New',s:[256,512,1024],h:1}),
 P('s-plus','phones','Galaxy S Plus',999,'Big screen, all-day battery, flagship speed.','phone-plus','Onyx:1c1c1e,Marble:d9d6d0,Cobalt:3d5a80','Display=6.7" AMOLED 2X|Camera=50MP triple|Battery=4,900 mAh',{s:[256,512]}),
 P('z-fold','phones','Galaxy Z Fold',1899,'A tablet-sized screen that folds into your pocket.','phone-fold','Navy:1f2a44,Silver:c8cacf,Blush:e3c5c0','Display=7.6" foldable AMOLED|Cover screen=6.3"|Battery=4,400 mAh',{tag:'New',s:[256,512,1024],h:1}),
 P('z-flip','phones','Galaxy Z Flip',1099,'Pocket-sized fold with a Flex Window.','phone-flip','Mint:b7d9c9,Lavender:c4b5e0,Graphite:3a3d42','Display=6.7" foldable AMOLED|Cover screen=3.4"|Battery=4,000 mAh',{s:[256,512]}),
 P('tab-s','phones','Galaxy Tab S',799,'A vivid AMOLED display built for work and play.','tablet','Graphite:3b3d42,Beige:d9ccb8','Display=11" AMOLED 120Hz|S Pen=Included|Battery=8,400 mAh',{s:[128,256,512],h:1}),
 P('neo-qled','tvs','Neo QLED 8K',2499,'Quantum Mini LED with AI upscaling to 8K.','tv-neo','Black:111111,Silver:aaaaaa','Resolution=8K|Backlight=Quantum Mini LED|Refresh rate=120Hz',{h:1}),
 P('the-frame','tvs','The Frame',1499,'Art Mode with a matte, anti-glare display.','tv-frame','Black:111111','Resolution=4K QLED|Art Mode=Matte display|Refresh rate=120Hz'),
 P('crystal','tvs','Crystal UHD',549,'Crisp 4K picture at an easy price.','tv-crystal','Black:111111','Resolution=4K UHD|Processor=Crystal 4K|Refresh rate=60Hz'),
 P('fridge','appliances','Bespoke Fridge',2299,'Custom panels and AI energy saving.','fridge','Steel:b8bcc2,White:f4f4f4,Navy:26324a','Capacity=29 cu. ft.|Panels=Customisable|Energy=ENERGY STAR',{h:1}),
 P('washer','appliances','Bespoke Washer',1099,'AI Wash adapts to every load.','washer','White:f4f4f4,Navy:26324a','Capacity=5.3 cu. ft.|Cycles=AI Wash|Energy=ENERGY STAR'),
 P('book','computing','Galaxy Book',1499,'Ultra-thin laptop with all-day battery life.','laptop','Moonstone:8f949c,Graphite:3a3c40','Display=16" AMOLED|Memory=16 GB|Battery=Up to 21 hours',{s:[512,1024],h:1}),
 P('odyssey','computing','Odyssey Monitor',699,'Fast, curved gaming at 240Hz.','monitor','Black:111111','Panel=32" QHD curved|Refresh rate=240Hz|Response=1 ms'),
 P('watch','wearables','Galaxy Watch',349,'Sleep, heart and energy insights on your wrist.','watch','Graphite:3a3d42,Silver:d6d7da,Gold:d8b98a','Display=1.5" AMOLED|Sensors=Heart, sleep, body|Battery=Up to 40 hours',{h:1}),
 P('ring','wearables','Galaxy Ring',399,'Track sleep and readiness without a screen.','ring','Black:2a2b2e,Silver:d6d7da,Gold:d8b98a','Weight=2.3 to 3.0 g|Battery=Up to 7 days|Water resistance=10 ATM'),
 P('buds','audio','Galaxy Buds',199,'Adaptive noise cancelling with studio-grade sound.','buds','White:f1f1f1,Graphite:45484d','Noise control=Adaptive ANC|Battery=Up to 30 hours|Rating=IPX7',{tag:'Deal',h:1}),
 P('soundbar','audio','Soundbar',799,'Cinematic 11.1.4 channel sound.','soundbar','Black:111111','Channels=11.1.4|Format=Dolby Atmos|Connectivity=Wi-Fi, Bluetooth')
];
const FAQ=[
 ['How do I track my order?','Open your confirmation email and select Track order, or sign in and visit Order status.'],
 ['What is the return policy?','Most products can be returned within 30 days in their original condition for a full refund.'],
 ['How long is the warranty?','Galaxy devices include a 1-year limited warranty. Appliances may carry longer cover on key parts.'],
 ['How do I book a repair?','Choose your product, describe the issue and pick a service centre or a mail-in repair.'],
 ['Where can I download manuals?','Every product page lists its manual and latest software. Search by model number.'],
 ['Can I trade in my old device?','Yes. Enter your device model for an instant estimate, then apply it at checkout.']
];
const FOOT={
 Shop:['Phones','TVs','Appliances','Computing','Accessories'],
 Support:['Contact us','Order status','Warranty','Repair','Downloads'],
 Explore:['Galaxy AI','SmartThings','Trade-in','Financing','Offers'],
 About:['Our company','Sustainability','Careers','Newsroom','Investors']
};
