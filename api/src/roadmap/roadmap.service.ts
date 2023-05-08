import { Injectable } from '@nestjs/common';

import { CategoryStatus } from './types';

@Injectable()
export class RoadmapService {
  getRoadmap(id: number): object {
    
    return {
      'roadmapCategory': {
        'id': 1,
        'name': 'Web Development',
        'status': CategoryStatus.ACTIVE,
        'parent_id': null,
        'children': [
          {
            'id': 2,
            'name': 'Front-End Developer',
            'status': CategoryStatus.ACTIVE,
            'parent_id': 1,
            'children': [
              {
                'id': 3,
                'name': 'JavaScript [ Basic ]',
                'role': 'Frontend JS Dev',
                'status': CategoryStatus.ACTIVE,
                'parent_id': 2,
                'children': [
                  {
                    'id': 4,
                    'name': 'Fundamentals',
                    'parent_id': 3,
                    'children': [
                      [
                        {
                          'id': 5,
                          'name': 'Data types',
                          'parent_id': 4,
                          'children': [
                            {
                              'id': 7,
                              'name': 'Basic data types',
                              'parent_id': 5,
                              'isPassed': true,
                              'status': CategoryStatus.ACTIVE,
                            },
                            {
                              'id': 8,
                              'name': 'Numbers',
                              'parent_id': 5,
                              'isPassed': false,
                              'status': CategoryStatus.ACTIVE,
                            },
                          ]
                        },
                        {
                          'id': 6,
                          'name': 'Type conversions',
                          'parent_id': 4,
                          'children': [
                            '...'
                          ]
                        }
                      ]
                    ]
                  }
                ]
              },
              {
                'id': 10,
                'name': 'JavaScript [ Basic ]',
                'role': 'Frontend JS Dev / Engineer',
                'children': [
                  '...'
                ]
              }
            ]
          },
          
          {
            'name': 'Back-End Developer',
            'type': CategoryStatus.INACTIVE,
            'parent_id': 1,
            'children': [
              '...'
            ]
          }
        ]
      }
    };
  }
}
