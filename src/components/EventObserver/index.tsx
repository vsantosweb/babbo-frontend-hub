import React, { useEffect, useRef } from 'react';

export const EventObserver = ({ events }) => {

  const observer = useRef(null);

  useEffect(() => {
    // Criar um IntersectionObserver
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Registrar uma impressão quando um evento se tornar visível
          const eventId = entry.target.getAttribute('data-event-id');
          registerImpression(eventId);
        }
      });
    });

    // Observar todos os elementos com a classe "event-item"
    document.querySelectorAll('.event-item').forEach((eventItem) => {
      observer.current.observe(eventItem);
    });

    // Limpar o observador quando o componente for desmontado
    return () => {
      observer.current.disconnect();
    };
  }, [events]); // Certifique-se de que o observador seja atualizado quando os eventos mudarem

  const registerImpression = (eventId) => {
    // Envie uma solicitação para registrar uma impressão para o backend
    console.log('Impressão registrada para o evento:', eventId);
  };

  return (
    <div>
      <h1>Event List</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id} className="event-item" data-event-id={event.id}>
            {event.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
