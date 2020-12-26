#include <iostream>
#include <vector>
#include <queue>
#include <utility>
#include <cstring>
#include <functional>

using namespace std;

vector <pair<int,int> > g[10005];
int n,e,rastojanje[10005];
int markiran[10005];
int poslednji_pre[10005];

int minIndeks ()      // trazimo cvor koji je nemarkiran tako da ima najmaje rastojanje
{
    int trenutni_najmanji = -1;
    for(int u = 0; u < n; u++)
    {
        if(!markiran[u])
            if(trenutni_najmanji == -1 || rastojanje[u] < rastojanje[trenutni_najmanji])
                trenutni_najmanji = u;
    }
    return trenutni_najmanji;
}

void dijkstra1(int s)  // vremenska slozenost O(V^2) gde je v broj cvorova grafa
{
    memset(markiran, 0, sizeof(markiran));              // na pocetku nijedan nije markiran
    memset(rastojanje, 63, sizeof(rastojanje));         // rastojanje stavljamo na nesto veliko da bi bilo promenjeno 
    memset(poslednji_pre, -1, sizeof(poslednji_pre));   // poslednji_pre stavljamo na -1 jer jos nismo nasli nijednog pre
    
    rastojanje[s] = 0;                                  // rastojanje od s do s je 0
    for(int i = 0; i < n; i++)                          // algoritam ima n iteracija  
    {
        int u = minIndeks();                            // nadjemo nemarkirani s najmanjim rastojanjem
        markiran[u] = 1;                                // markiramo ga
        for(int i = 0; i < g[u].size(); i++)            // idemo po njegovim susedima
        {
            int v = g[u][i].second, tezina = g[u][i].first;
            if(!markiran[v])
                if(rastojanje[u] + tezina < rastojanje[v])  // gledamo da li smo nasli bolji put do nekog nemarkiranog
                {
                    rastojanje[v] = rastojanje[u] + tezina; // ako jesmo, promenimo vrednost tog cvora na bolji put
                    poslednji_pre[v] = u;                   // i kazemo da smo dosli sa cvora u
                }
        } 
    }
} 

void rekonstruisi_put(int s, int a)
{
    if(a == s)
    {
       cout << a << " ";
       return;
    }
    rekonstruisi_put(s, poslednji_pre[a]);
    cout << a << " ";
}

void dijkstra2() // vremenska slozenost O(ElogV) gde je E broj grana a V broj cvorova grafa
{
    memset(rastojanje, 63, sizeof(rastojanje));           // inicijalizacija na veliki broj
    priority_queue<pair<int,int>, vector<pair<int,int> >, greater<pair<int,int> > > pq;
    rastojanje[0] = 0;
    pq.push(make_pair(0, 0));                             // rastojanje od 0 je 0
    while(!pq.empty())                                    // dok god ima nesto u redu sa prioritetom
    {
        int u = pq.top().second, d = pq.top().first;      // procitamo cvor i rastojanje do njega
        pq.pop();
        if(d > rastojanje[u]) continue;                   // ako vec imamo krace za taj cvor continue
        for(int i = 0; i < g[u].size(); i++)              // inace idemo po susedima
        {
            int v = g[u][i].second, tezina = g[u][i].first; // procitamo suseda i tezinu grane do njega
            if(rastojanje[u] + tezina < rastojanje[v])      // vidimo da li imamo bolje rastojanje do suseda
            {
                rastojanje[v] = rastojanje[u] + tezina;     // ako imamo pamtimo ga i dodamo u pq
                pq.push(make_pair(rastojanje[v], v));
            }
        }
    }
} 

int main()
{
    n = 6;
    g[0].push_back(make_pair(60,1));
    g[1].push_back(make_pair(60,0));
    g[0].push_back(make_pair(30,4));
    g[4].push_back(make_pair(30,0));
    g[0].push_back(make_pair(200,2));
    g[2].push_back(make_pair(200,0));
    g[2].push_back(make_pair(110,1));
    g[1].push_back(make_pair(110,2));
    g[0].push_back(make_pair(150,5));
    g[5].push_back(make_pair(150,0));
    g[4].push_back(make_pair(40,5));
    g[5].push_back(make_pair(40,4));
    g[3].push_back(make_pair(400,1));
    g[1].push_back(make_pair(400,3));
    g[2].push_back(make_pair(50,3));
    g[3].push_back(make_pair(50,2));
    
    cout<< "Dijkstrin algoritam - 1: ";
    int s = 0;
    dijkstra1(0);
    for(int i = 0; i < 6; i++)
        cout << rastojanje[i] << " ";
    cout << endl;
    
    cout << "Putevi: " << endl;
    for(int i = 0; i < 6; i++)
    {
        if(i == s) continue;
        cout << s << "-" << i << ": ";
        rekonstruisi_put(s, i);
        cout << endl;
    }
    cout << endl;
    
    
    dijkstra2();
    cout<< "Dijkstrin algoritam - 2: ";
    for(int i = 0; i < 6; i++)
        cout << rastojanje[i] << " ";
    cout << endl;
    return 0;
}
