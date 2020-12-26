///Floyd - Warshall Algorithm

#include <iostream>
#include <cstring>
#include <algorithm>
#define INF 1061109567

using namespace std;

int dis[505][505],n,e;

void floydWarshall()
{
    for(int k=0;k<n;k++)          // dodajemo cvor k
    {
        for(int i=0;i<n;i++)        //prolazimo kroz matricu
        {
            for(int j=0;j<n;j++)
                dis[i][j]=min(dis[i][j],dis[i][k]+dis[k][j]);  // gledamo da li smo nasli bolji put
        }
    }
}

int main()
{
    ios_base::sync_with_stdio(0);
    n = 5;
    memset(dis,63,sizeof(dis));
    for(int i=0;i<n;i++)
        dis[i][i]=0;
    
    dis[0][1] = 60;
    dis[1][0] = 60;
    dis[0][4] = 30;
    dis[4][0] = 30;
    dis[0][2] = 200;
    dis[2][0] = 200;
    dis[2][1] = 110;
    dis[1][2] = 110;
    dis[3][1] = 400;
    dis[1][3] = 400;
    dis[2][3] = 50;
    dis[3][2] = 50;
    
    
    floydWarshall();
    
    cout << "Matrica rastojanja Flojd-Varsalovog algoritma: " <<endl;
    for(int i=0;i<n;i++)
    {
        for(int j=0;j<n;j++)
            cout<<dis[i][j]<<" ";
        cout<<"\n";
    }
    return 0;
}
