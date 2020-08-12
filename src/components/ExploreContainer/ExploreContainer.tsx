import React from 'react'

import './ExploreContainer.css'

interface ExploreContainerProps {
  name: string
}

const ExploreContainer: React.FC<ExploreContainerProps> = ({ name }) => (
  <div className="container">
    <strong>{name}</strong>
    <p>
      Explore{' '}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://ionicframework.com/docs/components"
      >
        UI Components
      </a>
    </p>
  </div>
)

export default ExploreContainer
