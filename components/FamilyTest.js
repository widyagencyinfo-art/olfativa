"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import PerfumeGrid from "./PerfumeGrid";
import { FAMILIES, QUESTIONS, scoreAnswers } from "@/lib/familyTest";

export default function FamilyTest({ allPerfumes }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null));

  const result = useMemo(() => {
    if (step <= QUESTIONS.length - 1) return null;
    return scoreAnswers(answers);
  }, [answers, step]);

  const family = result ? FAMILIES[result.family] : null;

  const recommendations = useMemo(() => {
    if (!family) return [];
    return allPerfumes
      .filter(family.filterFn)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 6);
  }, [family, allPerfumes]);

  function handleAnswer(idx) {
    const next = [...answers];
    next[step] = idx;
    setAnswers(next);
    setStep(step + 1);
  }

  function restart() {
    setStep(0);
    setAnswers(Array(QUESTIONS.length).fill(null));
  }

  // Resultado
  if (result && family) {
    return (
      <div className="test-result">
        <div
          className="test-result-hero"
          style={{
            background: `linear-gradient(135deg, ${family.color}33, ${family.color}11)`,
            borderLeft: `4px solid ${family.color}`,
          }}
        >
          <span className="eyebrow">Tu familia olfativa es</span>
          <h2 style={{ color: family.color }}>{family.name}</h2>
          <p>{family.description}</p>
        </div>

        <div className="test-scores">
          <h3>Tu perfil completo</h3>
          <div className="test-bars">
            {Object.entries(result.scores)
              .sort((a, b) => b[1] - a[1])
              .map(([k, score]) => {
                const f = FAMILIES[k];
                const pct = (score / QUESTIONS.length) * 100;
                return (
                  <div key={k} className="test-bar-row">
                    <span className="test-bar-label">{f.name}</span>
                    <div className="test-bar-track">
                      <div
                        className="test-bar-fill"
                        style={{
                          width: `${pct}%`,
                          background: f.color,
                        }}
                      />
                    </div>
                    <span className="test-bar-score">{score}</span>
                  </div>
                );
              })}
          </div>
        </div>

        {recommendations.length > 0 && (
          <div className="block">
            <h3>Tus 6 perfumes recomendados</h3>
            <p style={{ color: "var(--text-soft)", marginBottom: "16px" }}>
              Los mejores perfumes {family.name.toLowerCase()} de nuestro
              catálogo según tu perfil.
            </p>
            <PerfumeGrid perfumes={recommendations} />
          </div>
        )}

        <div className="test-actions">
          <button onClick={restart} className="btn btn-ghost">
            Hacer el test de nuevo
          </button>
          <Link href="/guias/familias-olfativas" className="btn">
            Más sobre las familias olfativas →
          </Link>
        </div>

        <p
          style={{
            color: "var(--text-soft)",
            fontSize: "0.88rem",
            textAlign: "center",
            marginTop: "32px",
          }}
        >
          ¿Te ha gustado el test? Compártelo con quien quieras: la URL es{" "}
          <code>olfativa.es/test/familia-olfativa</code>
        </p>
      </div>
    );
  }

  // Pregunta actual
  const current = QUESTIONS[step];
  const progress = ((step + 1) / QUESTIONS.length) * 100;

  return (
    <div className="test-question">
      <div className="test-progress">
        <div className="test-progress-bar">
          <div
            className="test-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="test-progress-label">
          Pregunta {step + 1} de {QUESTIONS.length}
        </span>
      </div>

      <h2 className="test-q-title">{current.q}</h2>

      <div className="test-options">
        {current.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(i)}
            className="test-option"
          >
            {opt.label}
          </button>
        ))}
      </div>

      {step > 0 && (
        <button
          onClick={() => setStep(step - 1)}
          className="test-back"
          aria-label="Volver a la pregunta anterior"
        >
          ← Pregunta anterior
        </button>
      )}
    </div>
  );
}
