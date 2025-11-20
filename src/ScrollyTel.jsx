import * as Scrollytelling from "@bsmnt/scrollytelling";
import "./style.css";


function ScTe() {
  return (
    <div className="app">
      {/* Section 1: Hero Text Animations */}
      <Scrollytelling.Root start="top top" end="bottom bottom">
        <Scrollytelling.Pin childHeight="100vh" pinSpacerHeight="300vh">
          <div className="hero-section">
            <Scrollytelling.Animation
              tween={{
                start: 0,
                end: 30,
                from: { opacity: 0, scale: 0.8 },
                to: { opacity: 1, scale: 1 }
              }}
            >
              <h1 className="hero-title"> We Kleidsys Technologies  </h1>
            </Scrollytelling.Animation>

            <Scrollytelling.Animation
              tween={{
                start: 30,
                end: 60,
                from: { opacity: 0, y: 50 },
                to: { opacity: 1, y: 0 }
              }}
            >
              <h1 className="hero-title">chain from design,</h1>
            </Scrollytelling.Animation>

            <Scrollytelling.Animation
              tween={{
                start: 60,
                end: 100,
                from: { opacity: 0, y: 50 },
                to: { opacity: 1, y: 0 }
              }}
            >
              <h1 className="hero-title"> manufacturing, distribution.</h1>
            </Scrollytelling.Animation>
          </div>
        </Scrollytelling.Pin>
      </Scrollytelling.Root>

      {/* Section 2: Rotating Element */}
      <Scrollytelling.Root start="top top" end="bottom bottom">
        <Scrollytelling.Pin childHeight="100vh" pinSpacerHeight="400vh">
          <div className="model-section">
            <Scrollytelling.Animation
              tween={{
                start: 0,
                end: 100,
                to: { rotation: 360 }
              }}
            >
              <div className="rotating-element">🎨</div>
            </Scrollytelling.Animation>

            <Scrollytelling.Animation
              tween={{
                start: 20,
                end: 50,
                from: { opacity: 0, x: -100 },
                to: { opacity: 1, x: 0 }
              }}
            >
              <p className="model-text">Twisted 3D text</p>
            </Scrollytelling.Animation>
          </div>
        </Scrollytelling.Pin>
      </Scrollytelling.Root>

      {/* Section 3: Cards Reveal */}
      <Scrollytelling.Root start="top bottom" end="bottom top">
        <div className="cards-section">
          {[1, 2, 3, 4].map((item, index) => (
            <Scrollytelling.Animation
              key={item}
              tween={{
                start: index * 15,
                end: index * 15 + 20,
                from: { opacity: 0, y: 100, scale: 0.9 },
                to: { opacity: 1, y: 0, scale: 1 }
              }}
            >
              <div className="card">
                <h3>Project {item}</h3>
                <p>Made by Basement Studio</p>
              </div>
            </Scrollytelling.Animation>
          ))}
        </div>
      </Scrollytelling.Root>

      {/* Section 4: Simple Background Parallax Effect (Manual Animation) */}
      <Scrollytelling.Root start="top bottom" end="bottom top">
        <div className="parallax-section">
          {/* Background moves slower */}
          <Scrollytelling.Animation
            tween={{
              start: 0,
              end: 100,
              to: { y: -200 }
            }}
          >
            <div className="parallax-bg" />
          </Scrollytelling.Animation>

          {/* Text moves faster */}
          <Scrollytelling.Animation
            tween={{
              start: 0,
              end: 100,
              to: { y: 100 }
            }}
          >
            <h2 className="parallax-text">From the laboratory From the laboratory...</h2>
          </Scrollytelling.Animation>
        </div>
      </Scrollytelling.Root>
    </div>
  );
}

export default ScTe;