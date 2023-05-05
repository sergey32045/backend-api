import { Injectable } from '@nestjs/common';

import { CategoryType } from './types';

@Injectable()
export class RoadmapService {
  getRoadmap(id: number): object {
    
    return {
      'roadmapCategory': {
        'name': 'Web Development',
        'categoryTypes': [
          {
            'name': 'Front-End Developer',
            'type': CategoryType.ACTIVE,
            'categoryTopics': [
              {
                'name': 'JavaScript [ Basic ]',
                'role': 'Frontend JS Dev',
                'topics': [
                  {
                    'name': 'Fundamentals',
                    'keyTopics': [
                      [
                        {
                          'name': 'Data types',
                          'labels': [
                            {
                              'name': 'Basic data types',
                              'isPassed': true,
                            },
                            {
                              'name': 'Numbers',
                              'isPassed': false,
                            },
                          ]
                        },
                        {
                          'name': 'Type conversions',
                          'labels': [
                            '...'
                          ]
                        }
                      ]
                    ]
                  }
                ]
              },
              {
                'name': 'JavaScript [ Basic ]',
                'role': 'Frontend JS Dev / Engineer',
                'topics': [
                  '...'
                ]
              }
            ]
          },
          
          {
            'name': 'Back-End Developer',
            'type': CategoryType.DISABLED,
            'categoryTopics': [
              '...'
            ]
          }
        ]
      }
    };
  }
}
