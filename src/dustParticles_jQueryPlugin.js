(function($) {
    $.fn.extend({
        dustParticles: function(particlesNumber, opacity) {
            return this.each(function() {
                //Generate a 'canvas' with size of element selected from the DOM .
                var width = $(this).width();
                var height = $(this).height();
                var canvas = document.createElement('canvas');
                canvas.id = 'canvas';
                document.body.appendChild(canvas);
                //Generate the context of canvas
                var ctx = canvas.getContext('2d');
                canvas.width = width;
                canvas.height = height;
                var particles = [];
                var particleLimit = particlesNumber;
                //We create our funny particles !
                for (var i = 0; i < particleLimit; i++) {
                    particles.push(new particle());
                }
                //Function generating the object particles , having size , radio, opacity, initial position and color.
                function particle() {
                    this.speed = {
                        x: Math.random() * 3 - 0.5,
                        y: Math.random() * 3 - 0.5
                    };
                    this.radius = Math.random() * (10 - 1) + 1;
                    console.log(this.radius)
                    this.opacity = opacity / this.radius;
                    this.r = 255;
                    this.g = 255;
                    this.b = 255;
                    this.x = Math.random() * (canvas.width - 0) + 0;
                    this.y = Math.random() * (canvas.height - 0) + 0;
                    this.color = this.color = 'rgba(' + this.r + ', ' + this.g + ', ' + this.b + ', ' + this.opacity + ')';
                }

                function live() {
                    //We repainted the canvas to create the sensation of movement.
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    particles.forEach(function(element, index) {
                        ctx.beginPath();
                        var gradient = ctx.createRadialGradient(element.x, element.y, 0, element.x, element.y, element.radius);
                        gradient.addColorStop(1, 'rgba(' + element.r + ', ' + element.g + ', ' + element.b + ', 0)');
                        gradient.addColorStop(0.5, 'rgba(' + element.r + ', ' + element.g + ', ' + element.b + ', ' + (element.opacity / 2) + ')');
                        gradient.addColorStop(0, 'rgba(' + element.r + ', ' + element.g + ', ' + element.b + ', ' + element.opacity + ')');
                        ctx.fillStyle = gradient;
                        ctx.arc(element.x, element.y, element.radius, 0, Math.PI * 2, true);
                        ctx.fill();
                        //New position of particles
                        element.x += element.speed.x;
                        element.y += element.speed.y;
                        //We avoid the particles are beyond our territory!
                        if (element.x < -50) element.x = canvas.width + 50;
                        if (element.y < -50) element.y = canvas.height + 50;
                        if (element.x > canvas.width + 50) element.x = -50;
                        if (element.y > canvas.height + 50) element.y = -50;
                    });
                }
                setInterval(live, 33);
            });
        }
    });
})(jQuery)

