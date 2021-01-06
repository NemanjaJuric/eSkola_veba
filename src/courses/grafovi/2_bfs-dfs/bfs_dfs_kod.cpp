#include <iostream>
#include <vector>
#include <cstring>
#include <queue>
#include <stack>
#include <algorithm>

using namespace std;

vector<int> g[10005];
int n,e,posecen[10005];

void dfs_iterativni() 
{
    memset(posecen,0,sizeof(posecen));         // popunimo niz posecen sa 0
    stack<int> stek;                           // inicijalizujemo stek   
    stek.push(0);                              // krecemo od cvora 0
  
    while (!stek.empty())                      // dok stek nije prazan
    { 
        int s = stek.top();                    // uzimamo element sa vrha
        stek.pop(); 
  
        if (posecen[s] == 0)                   // ako nije posecen, posetimo ga i ispisemo
        { 
            cout << s << " "; 
            posecen[s] = 1; 
        } 

        for (int i = 0; i < g[s].size(); i++)  // krecemo se po susedima
        {   
            int v = g[s][i];                   // cvor v je i-ti sused od s
            if (posecen[v] == 0)               // ako nije posecen dodam ga na stek
                stek.push(g[s][i]); 
            
        }
    } 
}


void dfs_rekurzivni(int u)  
{
    posecen[u] = 1;                        // posetimo cvor u i ispisemo ga
    cout << u << " ";
    for(int i = 0; i < g[u].size(); i++)   // idem kroz njegove susede
    {                                      
        int v = g[u][i];                   // cvor v je i-ti sused od u
        if(posecen[v] == 0)                // ako nije posecen 
             dfs_rekurzivni(v);            // nastavljamo obilazak od njega   
         
    }
}



void bfs()  
{ 
    memset(posecen, 0, sizeof(posecen));    // popunjavamo niz sa 0
    queue<int> q;                       // inicijalizujemo red
    posecen[0]=1;                       // krecemo od cvora 0 i kazemo da je posecen
    q.push(0);                          // dodamo ga u red
    
    while(!q.empty())                   // dok god red nije prazan
    {
        int u=q.front();                // uzimamo sledeceg na redu
        q.pop();
        cout<< u <<" ";
        for(int i = 0; i < g[u].size(); i++)  // prolazimo kroz njegove susede
        {
            int v = g[u][i];              // i-ti sused cvora u je cvor v
            if(posecen[v] == 0)           // ako v nije posecen
            {
                posecen[v] = 1;           // posetimo ga i dodamo u red
                q.push(v);
            }
        }
    }
}

int main()
{
    
    ios_base::sync_with_stdio(0);
    n = 8;
    
    g[5].push_back(6);
    g[6].push_back(5);
    g[5].push_back(4);
    g[4].push_back(5);
    g[3].push_back(7);
    g[7].push_back(3);
    g[3].push_back(5);
    g[5].push_back(3);
    g[1].push_back(6);
    g[6].push_back(1);
    g[0].push_back(6);
    g[6].push_back(0);
    g[3].push_back(2);
    g[2].push_back(3);
    g[0].push_back(3);
    g[3].push_back(0);
    g[0].push_back(2);
    g[2].push_back(0);
    
    cout<<"DFS - iterativni: ";
    dfs_iterativni();
    cout<<endl;
    
    cout<<"DFS - rekurzivni: ";
    memset(posecen, 0, sizeof(posecen));
    for(int i =0; i<n; i++)
        reverse(g[i].begin(), g[i].end());
    dfs_rekurzivni(0);
    cout<<endl;
    
    cout << "BFS: ";
    bfs();
    cout <<endl;
}
